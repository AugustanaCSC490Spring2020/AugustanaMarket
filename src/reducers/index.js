import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import listReducer from './listReducer'

const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    list: listReducer,
});

export default allReducers;