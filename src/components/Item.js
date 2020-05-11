import React from 'react';
import NavBar from './NavBar';
import {useSelector, useDispatch} from 'react-redux';
import * as itemActions from '../redux/actions/itemActions';
import './styles/Item.css';
import { Link } from 'react-router-dom'

const Item = ({match}) => {
    const items = useSelector(state => state.list.items);
    const selectedItem = useSelector(state => state.item);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(itemActions.resetState());
    }, [])
    const itemID = match.params.item;
    const requestOrSell = match.params.type;
    if(!selectedItem.isLoaded){
        let contains = false;
        for(let i = 0; i < items.length; i++){
            if(items[i].id === itemID){
                contains = true;
                dispatch(itemActions.loadItemDetails(items[i]))
                break;
            }
        }
        if(!contains){
            dispatch(itemActions.checkFirestore(itemID, requestOrSell))
        }
    }

    return (
        <div>
            <NavBar/>

            {selectedItem.isLoaded ? (
                selectedItem.item ? (
                    <div id={"item-div"}>
                        <h1>{selectedItem.item.title}</h1>
                        <h2>Creator of post: {selectedItem.item.displayName}</h2>
                        <h2>Contact info: {selectedItem.item.email}</h2>
                        <h2>Price: ${selectedItem.item.price}</h2>
                        {selectedItem.item.description === '' ? null : <h4>Details: {selectedItem.item.description}</h4>}
                        <h2>Condition: {selectedItem.item.condition}</h2>
                        {selectedItem.item.itemType === 'book' ? (
                            <React.Fragment>
                                <h3>Category: {selectedItem.item.classCategory.toUpperCase()}</h3>
                                <h3>Course #: {selectedItem.item.courseNum}</h3>
                                <h3>ISBN #: {selectedItem.item.isbn}</h3>
                            </React.Fragment>
                        ) : null}
                        <Link to={`/list/${requestOrSell}/${selectedItem.item.uid}`}>View User's {requestOrSell === 'sell' ? 'Items' : 'Requests'} </Link>
                    </div>
                ) : <h1>Item not found</h1>
            ) : null}
        </div>
    )
}


export default Item