import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from './Firebase';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store, { persistor } from './redux/store';

// This is the react-redux-firebase configuration
// you can have the firebase state in redux have
// things such as user profile, online status, ect.
// If you want to have firestore to make a document
// for you user, you can.
const rrfConfig = {
    userProfile            : 'users',
    useFirestoreForProfile : true
};

// this is adding the react-redux-firebase props to the store
const rrfProps = {
    firebase,
    config   : rrfConfig,
    dispatch : store.dispatch
};

// in order to access the store (and include persist to the
// state), use firebase, and use the react-router-dom, you
// need to wrap them around your application
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
