import React from 'react';
import NavBar from './NavBar';
import * as listActions from '../redux/actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import './styles/ItemList.css';
import PageNotFound from './PageNotFound'

const ItemList = ({ match }) => {
    const itemList = useSelector((state) => state.list);
    const firebase = useFirebase(); 
    const dispatch = useDispatch();
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

                    <div id={"item-details-div"}>
                        <ul>
                            {
                                itemList.isLoaded ? itemList.items.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <div className="card card-div">
                                                <div className="card-body">
                                                    <h3 className="card-title">{item.title}</h3>
                                                    {item.itemType === 'book' ? <h5>Author: {item.author}</h5> : null}
                                                    <h5>Description: {item.description}</h5>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Condition: {item.condition}</li>
                                                    <li className="list-group-item">Price: ${item.price}</li>
                                                </ul>
                                                <div className="card-body">
                                                    <Link to={`/view/${item.id}/${requestOrSell}`}>
                                                        <button className={"btn btn-primary"}>See item details</button>
                                                    </Link>
                                                    {uid === firebase.auth().currentUser.uid ? (
                                                        <React.Fragment>
                                                            <Link to={`/edit/${requestOrSell}/${item.id}`}>
                                                                <button className={"btn btn-primary"}>Edit</button>
                                                            </Link>
                                                        </React.Fragment>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </li>
                                            );
                                        }) :
                                        null}
                        </ul>
                    </div>
                </React.Fragment>
            ) : (<PageNotFound/>)}
            
        </div>
    );
};

export default ItemList;
