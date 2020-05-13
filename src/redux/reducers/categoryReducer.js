const initialState = {
    classCategories : [
        'acct',
        'afsp',
        'anth',
        'arhi',
        'art',
        'astr',
        'biol',
        'busn',
        'chem',
        'chns',
        'clas',
        'comm',
        'csc',
        'csd',
        'ctrk',
        'data',
        'econ',
        'educ',
        'engl',
        'entm',
        'envr',
        'fren',
        'fyi',
        'geog',
        'geol',
        'grd',
        'grmn',
        'hepe',
        'hist',
        'honr',
        'intr',
        'jpn',
        'ls',
        'math',
        'mjmc',
        'musc',
        'phil',
        'phys',
        'pols',
        'psyc',
        'pubh',
        'relg',
        'scan',
        'soc',
        'span',
        'swed',
        'thea',
        'wgst',
        'wlit'
    ],
    isSell : true
};

/**
 * This reducer is the state for which class category is 
 * being searched for. This is primarily used for createItem,
 * but also in some places to determine if we are accessing 
 * the request or sell collection in firestore for components
 * that could not access this info from the component state.
 * @param state the current state of the reducer
 * @param {*} action the type of change to the state
 */
const createSellReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SWITCH_SEARCH':
            return {
                ...state,
                isSell : action.payload
            }
        default:
            return state;
    }
};

export default createSellReducer;
