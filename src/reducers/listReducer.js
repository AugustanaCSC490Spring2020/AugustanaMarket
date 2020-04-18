

const initialState = {
    items: [],
    isLoaded: false,
}


const listReducer = (state=initialState,action) => {
    switch (action.type) {
        case 'POPULATE_LIST':
            return {   
                items: action.payload,
                isLoaded: true,
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