import React from 'react';
import NavBar from './NavBar';
import * as listActions from '../redux/actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import './styles/ItemList.css';
import PageNotFound from './PageNotFound'
import Search from './Search'

const ItemList = ({ match }) => {
    const itemList = useSelector((state) => state.list);
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const [option, updateOption] = React.useState('allListings');
    const requestOrSell = match.params.type;
    const uid = match.params.uid;
    React.useEffect(() => {
        dispatch(listActions.resetState());
    }, []);

    if (!itemList.isLoaded) {
        dispatch(listActions.populate(requestOrSell, uid));
    }

    return (
        <div>
            {(requestOrSell === 'request' || requestOrSell === 'sell') ? (
                <React.Fragment>
                    <NavBar />
                    <Link onClick={() => updateOption('allListings')}>All Listings</Link>
                    <Link onClick={() => updateOption('myListings')}>{uid === firebase.auth().currentUser.uid ? 'My Listings' : 'Their Listings'}</Link>
                    {requestOrSell === 'sell' ? (
                        <Link to={`/list/request/${uid}`}>See Items Being Requested</Link>
                            ) : (
                        <Link to={`/list/sell/${uid}`}>See Items Being Sold</Link>
                    )}
                    {option === 'allListings' ? (
                        <Search match={match}/>
                    ) : (
                        <div id={"item-details-div"}>
                        <div className="container list-container">
                            <div className="row">
                            {
                                itemList.isLoaded ? itemList.items.map((item) => {
                                    return (
                                        <div className="col-md-3 col-sm-4 mb-3 mt-3">
                                            <div className="card rounded">
                                                <div className={"container w-100 center-text"}>
                                                    <img className="card-img-top w-50 pt-2" src="../../textbook-example.png" alt="Card image cap" />
                                                </div>
                                                <div className="card-body text-left">
                                                    <b><p className="card-title">{item.title}</p></b>
                                                    <p className="card-text">${item.price}</p>
                                                </div>
                                                {uid === firebase.auth().currentUser.uid ? (
                                                    <React.Fragment>
                                                        <div class="d-inline p-2 bg-dark text-white">
                                                            <Link className="text-decoration-none text-light" to={`/edit/${requestOrSell}/${item.id}`}>
                                                                Edit<i className="ml-2 fas fa-pencil-alt"></i>
                                                            </Link>
                                                        </div>
                                                    </React.Fragment>
                                                ) : null}
                                                <div className="d-inline p-2 bg-primary text-white rounded-bottom">
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
                    )}
                    
                </React.Fragment>
            ) : (<PageNotFound/>)}
            
        </div>
    );
};

export default ItemList;
