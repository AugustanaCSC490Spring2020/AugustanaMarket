import React from 'react';
import {useFirebase} from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const Login = ({history}) => {

    const firebase = useFirebase();
    return (
        <div>
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
    )
}

export default Login;