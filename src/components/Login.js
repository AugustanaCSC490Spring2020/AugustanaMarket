import React from 'react';
import './styles/Login.css';
import {useFirebase} from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
//import styled from 'styled-components';


/**
 * This component is the first "page" that the user
 * sees in order to authenticate with firebase through
 * their Augustana gmail account. If they try logging in
 * with a gmail account that is not part of the Augustana
 * Gsuit, then it will not allow the user to login. Once
 * the user has authenticated, they will be redirected to
 * the homepage of the application
 * @param history the url history. This allows for changing
 * the url of the application manually
 */
const Login = ({history}) => {
    // source http://react-redux-firebase.com/docs/recipes/auth.html
    const firebase = useFirebase();
    return (
        <div id={"background-img"}>
            <div id={"login-div"}>
                <h1 id={"login-title"}>Welcome to the Augustana Market!</h1>
                <h3 id={"login-subtitle"}>Please log in to continue.</h3>
                <br />
                <StyledFirebaseAuth
                    uiConfig={{
                        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
                        callbacks: {
                            signInSuccessWithAuthResult: (authResult) => {
                                firebase.handleRedirectResult(authResult).then(() => {
                                    history.push('/');
                                });
                                return false;
                            },
                        },
                    }}
                    firebaseAuth={firebase.auth()}
                />
            </div>

        </div>

    )
}

export default Login;