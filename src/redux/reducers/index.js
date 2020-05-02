import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import listReducer from './listReducer'
import categoryReducer from './categoryReducer';
import itemReducer from './itemReducer';

const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    list: listReducer,
    categories: categoryReducer,
    item: itemReducer,
});

export default allReducers;