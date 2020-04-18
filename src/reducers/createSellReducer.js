const initialState = {
    buyOrSell     : '',
    itemType      : '',
    classCategory : '',
    condition     : '',
    courseNum     : '',
    title         : '',
    author        : '',
    price         : '',
    description   : '',
    isbn          : '',
};

const createSellReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'RESET':
            return {
                buyOrSell     : '',
                itemType      : '',
                classCategory : '',
                condition     : '',
                courseNum     : '',
                title         : '',
                author        : '',
                price         : '',
                description   : '',
                isbn          : '',
            }
        
        case 'CHANGE_BUY_OR_SELL':
            return {
                ...state,
                buyOrSell : action.payload
            };

        case 'CHANGE_ITEM_TYPE':
            return {
                ...state,
                itemType : action.payload
            };
        
        case 'CHANGE_CLASS_CATEGORY':
            return {
                ...state,
                classCategory : action.payload
            };
        case 'CHANGE_COURSE_NUM':
            return {
                ...state,
                courseNum : action.payload
            };

        case 'CHANGE_CONDITION':
            return {
                ...state,
                condition : action.payload
            };

        case 'CHANGE_TITLE':
            return {
                ...state,
                title : action.payload
            };

        case 'CHANGE_AUTHOR':
            return {
                ...state,
                author : action.payload
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

        case 'CHANGE_DESCRIPTION':
            return {
                ...state,
                description : action.payload
            };

        case 'CREATE_SELL_ITEM':
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default createSellReducer;
