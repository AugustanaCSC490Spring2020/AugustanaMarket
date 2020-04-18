import React from 'react';
import NavBar from './NavBar';
import {useSelector, useDispatch} from 'react-redux';
import * as itemActions from '../actions/itemActions';

const Item = ({match}) => {
    const items = useSelector(state => state.list.items);
    const selectedItem = useSelector(state => state.item);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(itemActions.resetState());
    }, [])
    const itemID = match.params.item;
    if(!selectedItem.isLoaded){
        let contains = false;
        for(let i = 0; i < items.length; i++){
            if(items[i].id == itemID){
                contains = true;
                dispatch(itemActions.loadItemDetails(items[i]))
                break;
            }
        }
        if(!contains){
            dispatch(itemActions.checkFirestore(itemID))
        }
    }

    return (
        <div>
            <NavBar/>

            {selectedItem.isLoaded ? (
                selectedItem.item ? (
                    <div>
                        <h1>{selectedItem.item.title}</h1>
                        <h2>Creator of post: {selectedItem.item.displayName}</h2>
                        <h2>Contact info: {selectedItem.item.email}</h2>
                        <h2>Price: ${selectedItem.item.price}</h2>
                        {selectedItem.item.description == '' ? null : <h4>Details: {selectedItem.item.description}</h4>}
                        <h2>Condition: {selectedItem.item.condition}</h2>
                    </div>
                ) : <h1>Item not found</h1>
            ) : null}
        </div>
    )
}


export default Item