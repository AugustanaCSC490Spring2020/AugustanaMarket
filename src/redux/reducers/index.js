import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import listReducer from './listReducer'
import categoryReducer from './categoryReducer';
import itemReducer from './itemReducer';

/**
 * This is where all the reducers are combined
 * together to make "one" reducer because when
 * you are initializing the store, you can only
 * pass in one parameter for the reducer.
 */
const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    list: listReducer,
    categories: categoryReducer,
    item: itemReducer,
});

export default allReducers;