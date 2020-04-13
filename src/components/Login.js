import React from 'react';
import './styles/Login.css';
import {useFirebase} from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
//import styled from 'styled-components';



const Login = ({history}) => {

    const firebase = useFirebase();
    return (
        <div>
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