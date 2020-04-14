const initialState = {
    itemType   : 'book',
    buyOrSell : 'buy',
    category   : 'CSC',
    courseNum  : '',
    title      : '',
    price      : '',
    isbn       : ''
};

const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ITEM_TYPE':
            return {
                ...state,
                itemType : action.payload
            };
        case 'CHANGE_BUY_OR_SELL':
            return {
                ...state,
                buyOrSell : action.payload
            };
        case 'CHANGE_CATEGORY':
            return {
                ...state,
                category : action.payload
            };
        case 'CHANGE_COURSE_NUM':
            return {
                ...state,
                courseNum : action.payload
            };
        case 'CHANGE_TITLE':
            return {
                ...state,
                title : action.payload
            };
        case 'CHANGE_PRICE':
            return {
                ...state,
                price : action.payload
            };
        case 'CHANGE_ISBN':
            return {
                ...state,
                isbn : action.payload
            };
        case 'CREATE_ITEM':
            return state;

        default:
            return state;
    }
};

export default createReducer;
