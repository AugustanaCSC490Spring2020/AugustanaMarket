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
                                            <Link to={`/view/${item.id}/${buyOrSell}`}>
                                                <button className={"btn btn-primary"}>See item details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                    );
                                }) :
                                null}
                </ul>
            </div>
        </div>
    );
};

export default ItemList;
