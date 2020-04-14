

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

        default: {
            return state;
        }
    }
}






export default listReducer