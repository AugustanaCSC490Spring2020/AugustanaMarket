import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import createReducer from './createReducer';

const allReducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    create: createReducer
});

export default allReducers;