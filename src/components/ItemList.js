import React from 'react';
import NavBar from './NavBar';
import * as listActions from '../actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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

            <div>
                <ul>
                    {
                        itemList.isLoaded ? itemList.items.map((item) => {
                            return (
                                <li key={item.id}>
                                    <h3>{item.title}</h3>
                                    <h4>Condition: {item.condition}</h4>
                                    {
                                        item.itemType === 'book' ? <p>Author: {item.author}</p> :
                                        null}
                                    <p>Price: ${item.price}</p>
                                    <Link to={`/view/${item.id}/${buyOrSell}`}>
                                        <button>See item details</button>
                                    </Link>
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
