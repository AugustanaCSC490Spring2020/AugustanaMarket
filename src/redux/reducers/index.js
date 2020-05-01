import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import listReducer from './listReducer'
import createSellReducer from './createSellReducer';
import itemReducer from './itemReducer';

const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    list: listReducer,
    createSell: createSellReducer,
    item: itemReducer,
});

export default allReducers;