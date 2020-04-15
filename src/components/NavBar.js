import React from 'react';
import { useSelector } from 'react-redux';
import {useFirebase, isEmpty} from 'react-redux-firebase';
import './styles/NavBar.css';

const NavBar = ({history}) => {
    const firebase = useFirebase();
    const auth = useSelector((state) => state.firebase.auth);
    const handleSignout = () => {
        firebase.logout().then(history.push('/login'));
    }
    return (
        <body id={"navbar-body"}>
            <div id={"navbar-div"}>
                {isEmpty(auth) ? <h4>Please Sign In</h4> : (
                    <button id="signout-btn" onClick={handleSignout}>Sign Out</button>
                )}
                
            </div>
        </body>
    )
}

export default NavBar;