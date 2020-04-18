import React from 'react';
import { useSelector } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import './styles/NavBar.css';
import {Link} from 'react-router-dom'

const NavBar = ({history}) => {
    const firebase = useFirebase();
    const auth = useSelector((state) => state.firebase.auth);
    const handleSignout = () => {
        firebase.logout().then(history.push('/login'));
    }
    return (
        <body id={"navbar-body"}>
            <div id={"navbar-div"}>
                <Link to='/create/request'><h2>Request</h2></Link>
                <Link to='/create/sell'><h2>Sell</h2></Link>
                <button id="signout-btn" onClick={handleSignout}>Sign Out</button>             
            </div>
        </body>
    )
}

export default NavBar;