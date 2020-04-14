import React from 'react';
import NavBar from './NavBar';
import {useSelector, useDispatch} from 'react-redux';
import {loadItem} from '../actions';

const Item = ({match}) => {
    const items = useSelector(state => state.list.items);
    const selectedItem = useSelector(state => state.item);
    const dispatch = useDispatch();
    if(!selectedItem.isLoaded){
        for(let i = 0; i < items.length; i++){
            if(items[i].id == match.params.item){
                dispatch(loadItem(items[i]))
                break;
            }
        }
    }
    const displayItem = () => {
        const selectedItem = null;
        items.map(item => {
            if(item.id == match.params.item){
                selectedItem = item;
            }
        });
        return (
            <div>
                <h1>Title: {selectedItem.title}</h1>
                <h2>Author: {selectedItem.author}</h2>
                <h2>Creator: {selectedItem.creator}</h2>
                <h2>Price: ${selectedItem.price}</h2>
            </div>
        )
    }
    
    
    return (
        <div>
            <NavBar/>
            {selectedItem.isLoaded ? (
            <div>
                <h1>{selectedItem.item.title}</h1>
                <h2>{selectedItem.item.author}</h2>
                <h2>{selectedItem.item.creator}</h2>
                <h2>{selectedItem.item.price}</h2>
                <h4>{selectedItem.item.details}</h4>
                <h2>{selectedItem.item.condition}</h2>

            </div>) : null}
        </div>
    )
}


export default Item