import React from 'react';
import NavBar from './NavBar';
import * as listActions from '../actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/ItemList.css';

const ItemList = ({ match, history }) => {
    const itemList = useSelector((state) => state.list);
    const dispatch = useDispatch();
    const buyOrSell = match.params.type;
    if (buyOrSell !== 'request' && buyOrSell !== 'sell') {
        history.push('/list/sell');
    }
    React.useEffect(() => {
        dispatch(listActions.resetState());
    }, []);

    if (!itemList.isLoaded) {
        dispatch(listActions.populate(buyOrSell));
    }

    return (
        <div>
            <NavBar />

            <div id={"item-details-div"}>
                <div className="container list-container">
                    <div className="row centered-row">
                            {
                                itemList.isLoaded ? itemList.items.map((item) => {
                                    return (
                                        /*<div class="col-md-4">*/
                                            /*<div class="card"></div>*/
                                            /*<div class="card"><img class="card-img-top w-100 d-block">*/
                                                /*<div class="card-body">*/
                                                    /*<h4 class="card-title">Title</h4>*/
                                                    /*<p class="card-text">Description</p><button class="btn btn-primary" type="button">Button</button></div>*/
                                            /*</div>*/
                                        /*</div>*/

                                        // <li key={item.id}>
                                        <div className="col-md-4">
                                            <div className="card" id={"card-div"}>
                                                <div className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className={"center"}>
                                                            <img class="card-img-top w-50 d-block" src={"../../textbook-example.png"}></img>
                                                        </div>
                                                    </li>
                                                </div>
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
                                                        <Link to={`/view/${item.id}/${buyOrSell}`}>
                                                            <button className={"btn btn-primary"}>See item details</button>
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
        </div>
    );
};

export default ItemList;
