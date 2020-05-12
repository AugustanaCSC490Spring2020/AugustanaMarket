import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getFirebase } from 'react-redux-firebase';

// Assistance:

// https://www.youtube.com/watch?v=UAMzKRPPWTk -incorporate thunk
// https://github.com/iamshaunjp/React-Redux-Firebase-App/issues/11 -using newer versions

const persistConfig = {
    key       : 'root',
    storage,
    whitelist : ['list', 'item', 'categories'],
    blacklist : [ 'firebase', 'firestore' ]
};

// The persistor allows for redux state to be maintained when the page
// is refreshed. This is done by have redux-persist storing the state
// in local memory.  You can choose which states to persist and which
// ones should in the configuration.
const persistedReducer = persistReducer(persistConfig, allReducers);

// This is the store or where all the states will be stored as global
// variables.  We add the middleware thunk so that asyncronous functions
// can be called before dispatching an action.
const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase }))
    )
);

const persistor = persistStore(store);

export default store;
export { persistor };