
const initialState = {
    isLoaded: false,
    item: null
}

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