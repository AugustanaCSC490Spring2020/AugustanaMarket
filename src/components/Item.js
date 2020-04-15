import React from 'react';
import NavBar from './NavBar';
import {useSelector, useDispatch} from 'react-redux';
import {loadItemDetails} from '../actions';

const Item = ({match}) => {
    const items = useSelector(state => state.list.items);
    const selectedItem = useSelector(state => state.item);
    const dispatch = useDispatch();
    if(!selectedItem.isLoaded){
        for(let i = 0; i < items.length; i++){
            if(items[i].id == match.params.item){
                dispatch(loadItemDetails(items[i]))
                break;
            }
        }
    }

    return (
        <div>
            <NavBar/>
            {selectedItem.isLoaded ? (
            <div>
                <h1>{selectedItem.item.title}</h1>
                <h2>Author: {selectedItem.item.author}</h2>
                <h2>Creator of post: {selectedItem.item.displayName}</h2>
                <h2>Contact info: {selectedItem.item.email}</h2>
                <h2>Price: ${selectedItem.item.price}</h2>
                <h4>Details: {selectedItem.item.details}</h4>
                <h2>Condition: {selectedItem.item.condition}</h2>

            </div>) : null}
        </div>
    )
}


export default Item