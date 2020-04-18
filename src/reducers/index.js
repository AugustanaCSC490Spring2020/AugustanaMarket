import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import listReducer from './listReducer'
import createSellReducer from './createSellReducer';

const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    list: listReducer,
    createSell: createSellReducer
});

export default allReducers;