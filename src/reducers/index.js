import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import createSellReducer from './createSellReducer';

const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    createSell: createSellReducer
});

export default allReducers;