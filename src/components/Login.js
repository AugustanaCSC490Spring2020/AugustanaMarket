import React from 'react';
import {useDispatch} from 'react-redux';
import {signIn} from '../actions'

const Login = () => {
    const dispatch = useDispatch();
    const handleSignIn = () => {
        dispatch(signIn());
    }

    return (
        <div>
            <button onClick={handleSignIn}>Login</button>
        </div>
    )
}

export default Login;