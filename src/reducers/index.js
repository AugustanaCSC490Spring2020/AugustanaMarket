import {combineReducers} from 'redux';
import logReducer from './isLogged';

const allReducers = combineReducers({
    isLogged: logReducer
});

export default allReducers;