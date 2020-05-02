const initialState = {
    classCategories : [],
    loaded : false
};

const createSellReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'LOAD_CLASS_CATEGORIES':
            return {
                classCategories : action.payload,
                loaded : true
            }
        
        default:
            return state;
    }
};

export default createSellReducer;
