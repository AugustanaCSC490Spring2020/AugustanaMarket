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
    ]
};

const createSellReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default createSellReducer;
