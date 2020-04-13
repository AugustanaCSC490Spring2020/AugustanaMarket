import React from 'react';
import {useFirebase} from 'react-redux-firebase';
import './NavBar.css';

const NavBar = ({history}) => {
    const firebase = useFirebase();
    const handleSignout = () => {
        firebase.logout().then(history.push('/login'));
    }
    return (
        <body id={"navbar-body"}>
            <div id={"navbar-div"}>
                <button id="signout-btn" onClick={handleSignout}>Sign Out</button>
            </div>
        </body>
    )
}

export default NavBar;