import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import firebase from './Firebase';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import {ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';

// Assistance:

// https://www.youtube.com/watch?v=UAMzKRPPWTk -incorporate thunk
// https://github.com/iamshaunjp/React-Redux-Firebase-App/issues/11 -using newer versions

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  blacklist: ['firebase', 'firestore']
}

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase})),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

const persistor = persistStore(store);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
