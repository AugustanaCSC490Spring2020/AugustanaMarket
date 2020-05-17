import React from 'react';
import NavBar from './NavBar';
import * as listActions from '../redux/actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import { Link, useParams } from 'react-router-dom';
import './styles/ItemList.css';
import PageNotFound from './PageNotFound';
import Footer from './Footer';
import {switchSearch} from '../redux/actions'

/**
 * This component displays the items of a user's sellings
 * or requests with links to view them in more detail. 
 * This allows the user to other listings a user has. If
 * the items were created by the user, then the option
 * to edit and delete the items are present here.
 */
const ItemList = () => {
    const itemList = useSelector((state) => state.list);
    const isSell = useSelector((state) => state.categories.isSell);
    const firebase = useFirebase(); 
    const dispatch = useDispatch();
    // url parameters
    const { type: requestOrSell, uid } = useParams()
    // on initialization, reset to not being loaded
    React.useEffect(() => {
        dispatch(listActions.resetState());
    }, []);
    // if the items have not been loaded, then load
    // the items according to the user id. If the user
    // id does not exist, then it will result in an empty
    // array (which shows nothing)
    if (!itemList.isLoaded) {
        if(uid === 'favorites'){
            dispatch(listActions.loadFavorites(requestOrSell))
        } else {
            dispatch(listActions.populate(requestOrSell, uid));
        }
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
                        <div id={"item-details-div"} className={"pt-4"}>
                        <div className="container list-container">
                            <h4 className={"d-inline-block mr-4"}>
                                <Link className="text-decoration-none text-muted" to={`/search`} onClick={() => dispatch(switchSearch(requestOrSell === 'sell'))}>All {requestOrSell === 'sell' ? 'Listings' : 'Requests'}</Link>
                            </h4>
                            <h4 className={uid === 'favorites' ? "d-inline-block mr-4" : "d-inline-block mr-4 border-bottom border-primary"}>
                                <Link className={uid === 'favorites' ? "text-decoration-none text-muted" : "text-decoration-none text-primary"} to={`/list/${requestOrSell === 'sell' ? 'sell' : 'request'}/${uid === 'favorites' ? firebase.auth().currentUser.uid : uid}`} onClick={() => dispatch(listActions.resetState())}>{uid === firebase.auth().currentUser.uid || uid === 'favorites' ? 'My' : itemList && itemList.items.length !== 0 ? itemList.items[0].displayName + "'s" : null} {requestOrSell === 'sell' ? 'Listings' : 'Requests'}</Link>
                            </h4>
                            <h4 className={uid === 'favorites' ? "d-inline-block mr-4 border-bottom border-primary" : "d-inline-block mr-4"}>
                                <Link className={uid === 'favorites' ? "text-decoration-none text-primary" : "text-decoration-none text-muted"} to={`/list/${requestOrSell === 'sell' ? 'sell' : 'request'}/favorites`} onClick={() => dispatch(listActions.resetState())}>Favorite {requestOrSell === 'sell' ? 'Listings' : 'Requests'}</Link>
                            </h4>
                            <div className="row">
                            {
                                itemList.isLoaded ? itemList.items.map((item) => {
                                    return (
                                        <div key={item.id} className="col-md-3 col-sm-4 mb-3 mt-3">
                                            <div className="card rounded">

                                                <div className={"container center-text card-height-myl"}>
                                                    <img className="card-img-top w-50 pt-2 image-sizing-myl" src={item.imageUrl} />
                                                </div>
                                                <div className="card-body text-left">
                                                    <h4 className="card-title text-dark mb-0">{item.title}</h4>
                                                    <h5 className="card-text py-1 text-muted">{requestOrSell === 'sell' ? null : 'Asking Price: '}${item.price}</h5>
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
                                                ) : uid === 'favorites' ? (
                                                    <React.Fragment>
                                                        <div className={"pt-2 pr-2 position-absolute right-0"}>
                                                            <div className={"px-1 py-1"}>
                                                                <button name={item.id} onClick={() => dispatch(listActions.removeFromFavorites(requestOrSell, item.id))} className={"border rounded-circle outline-none border-grey like-btn"}>
                                                                    <h5 className={"m-0 pt-small"}>
                                                                        <i className="fa fa-heart color-red"></i>
                                                                    </h5>
                                                                </button>
                                                            </div>
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
                    <Footer/>                  
                </React.Fragment>
            ) : (<PageNotFound/>)}
            
        </div>
    );
};

export default ItemList;
