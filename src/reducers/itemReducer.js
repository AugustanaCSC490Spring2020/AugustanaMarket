import { actionTypes } from "react-redux-firebase"

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
        default:
            return state;
    }
}

export default itemReducer;