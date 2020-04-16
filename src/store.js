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
    whitelist : [],
    blacklist : [ 'firebase', 'firestore' ]
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase })),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const persistor = persistStore(store);

export default store;
export { persistor };