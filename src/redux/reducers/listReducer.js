

const initialState = {
    items: [],
    isLoaded: false,
}

/**
 * This reducer is the state for a listing of a user's items.
 * This state represents the requests or sellings of a user
 * @param state the current state of the reducer
 * @param action the change to the state
 */
const listReducer = (state=initialState,action) => {
    switch (action.type) {
        case 'POPULATE_LIST':
            return {   
                items: action.payload,
                isLoaded: true,
            }
        
        case 'DELETE_ITEM':
            return {
                items: action.payload,
                isLoaded: true
            }
        case 'RESET_LIST':
            return{
                items: [],
                isLoaded: false
            }

        default: {
            return state;
        }
    }
}






export default listReducer