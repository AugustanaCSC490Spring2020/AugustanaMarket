import React from 'react';
import {useFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import './styles/NavBar.css';

const NavBar = () => {
    const firebase = useFirebase();
    const handleSignout = () => {
        firebase.logout();
    }
    return (
        <body id={"navbar-body"}>
            <div id={"navbar-div"}>
                <Link to='/login'><button id="signout-btn" onClick={handleSignout}>Sign Out</button></Link>
            </div>
        </body>
    )
}

export default NavBar;