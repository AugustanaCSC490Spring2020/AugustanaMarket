import React from 'react';
import NavBar from './NavBar';
import * as listActions from '../redux/actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import './styles/ItemList.css';
import PageNotFound from './PageNotFound';
import {switchSearch} from '../redux/actions'

/**
 * This component displays the items of a user's sellings
 * or requests with links to view them in more detail. 
 * This allows the user to other listings a user has. If
 * the items were created by the user, then the option
 * to edit and delete the items are present here.
 * @param match the parameters passed by the url (see in
 * Router.js to see connection)
 */
const ItemList = ({ match }) => {
    const itemList = useSelector((state) => state.list);
    const isSell = useSelector((state) => state.categories.isSell);
    const firebase = useFirebase(); 
    const dispatch = useDispatch();
    // url parameters
    const requestOrSell = match.params.type;
    const uid = match.params.uid;
    // on initialization, reset to not being loaded
    React.useEffect(() => {
        dispatch(listActions.resetState());
    }, []);
    // if the items have not been loaded, then load
    // the items according to the user id. If the user
    // id does not exist, then it will result in an empty
    // array (which shows nothing)
    if (!itemList.isLoaded) {
        dispatch(listActions.populate(requestOrSell, uid));
    }

    /**
     * This method deletes an item (only present when it
     * is an item created by the user) by using thunk
     * @param e click event which triggers the deletion in redux
     */
    const deleteItem = (e) => {
        // the reason why the name of the target is that
        // when attempting to set the value and access it,
        // it was undefined. Instead the name of the html
        // document is used to set the document id
        const itemID = e.target.name
        // console.log(itemID);
        dispatch(listActions.deleteItem(requestOrSell, itemID))
    };

    return (
        <div>
            {/*Since the url parameter could be anything, 
            one needs to account for this. So if the parameter
            is valid, show the component. If it is not valid,
            give the PageNotFound component */}
            {(requestOrSell === 'request' || requestOrSell === 'sell') ? (
                <React.Fragment>
                    <NavBar />
                        <div id={"item-details-div"}>
                        <div className="container list-container">
                            <h4 className={"d-inline-block mr-3"}>
                                <Link className="text-decoration-none text-muted" to={`/search`} onClick={() => dispatch(switchSearch(requestOrSell === 'sell'))}>All {requestOrSell === 'sell' ? 'Listings' : 'Requests'}</Link>
                            </h4>
                            <h4 className={"d-inline-block ml-3 border-bottom border-primary"}>
                                {requestOrSell === 'sell' ?
                                    <Link className="text-decoration-none text-primary" to={`/list/sell/${firebase.auth().currentUser.uid}`}>My Listings</Link>
                                :
                                requestOrSell === 'request' ?
                                    <Link className="text-decoration-none text-primary" to={`/list/request/${firebase.auth().currentUser.uid}`}>My Requests</Link>
                                : null
                                }
                            </h4>
                            <div className="row">
                            {
                                itemList.isLoaded ? itemList.items.map((item) => {
                                    return (
                                        <div key={item.id} className="col-md-3 col-sm-4 mb-3 mt-3">
                                            <div className="card rounded">
                                                <div className={"container w-100 center-text"}>
                                                    <img className="card-img-top w-50 pt-2" src="../../textbook-example.png" alt="Card image cap" />
                                                </div>
                                                <div className="card-body text-left">
                                                    <b><p className="card-title">{item.title}</p></b>
                                                    <p className="card-text">${item.price}</p>
                                                </div>
                                                {/*This checks to see if url parameter for which user's
                                                lising is the current users. If it is, then allow for
                                                editing and deletion.*/}
                                                {uid === firebase.auth().currentUser.uid ? (
                                                    <React.Fragment>
                                                        <div className="container d-inline p-2 lower-opacity bg-dark text-white d-inline-block">
                                                            <Link className="text-decoration-none text-light" to={`/edit/${requestOrSell}/${item.id}`}>
                                                                Edit<i className="ml-2 fas fa-pencil-alt"></i>
                                                            </Link>
                                                            <p className={"d-inline-block mb-0 pb-0 ml-3 mr-3"}> | </p>
                                                            <Link className="text-decoration-none text-light" to={`/list/${requestOrSell}/${uid}`} name={item.id} onClick={deleteItem}>
                                                                Delete<i className="ml-2 fa fa-trash-o"></i>
                                                            </Link>
                                                        </div>
                                                    </React.Fragment>
                                                ) : null}
                                                <div className="d-inline p-2 bg-primary text-white rounded-bottom-less">
                                                    <Link className="text-decoration-none text-light" to={`/view/${item.id}/${requestOrSell}`}>
                                                        See more &#8594;
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                            );
                                        }) :
                                        null}
                            </div>
                        </div>
                    </div>                    
                </React.Fragment>
            ) : (<PageNotFound/>)}
            
        </div>
    );
};

export default ItemList;
