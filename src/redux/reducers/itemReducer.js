
const initialState = {
    isLoaded: false,
    item: null
}

/**
 * This reducer is the state for a single item to be 
 * displayed. This is used so that if the item is 
 * already in the state, then there is no need to 
 * do another read to firestore.
 * @param state the current state of the reducer
 * @param action the change to the state 
 */
const itemReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ITEM_LOADED':
            return {
                isLoaded: true,
                item: action.payload
            }
        
        case 'RESET_ITEM_INFO':
            return {
                isLoaded: false,
                item: null
            }
        case 'ITEM_NOT_FOUND':
            return {
                isLoaded: true,
                item: null
            }
        default:
            return state;
    }
}

export default itemReducer;