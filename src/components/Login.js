import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../actions'

const Login = () => {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const handleSignIn = () => {
        dispatch(login());
    }

    return (
        <div>
            <button onClick={handleSignIn}>{isLogged ? "True" : "False"}</button>
        </div>
    )
}

export default Login;