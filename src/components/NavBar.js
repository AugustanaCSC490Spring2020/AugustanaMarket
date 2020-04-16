import React from 'react';
import {useFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import './styles/NavBar.css';

const NavBar = () => {
    const firebase = useFirebase();
    const handleSignout = () => {
        firebase.logout();
    };
    return (
        <body id={"navbar-body"}>
        <nav className="navbar justify-content-end fixed-top navbar-div">
            <form className="form-inline">
                <img src={"./textbook_2x.png"} id={"nav-img"}/>
                <a className="navbar-brand">Augustana Marketplace</a>
                <div id={"tester"}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-info" type="submit">Search</button>
                    <button className="form-inline" id="signout-btn" onClick={handleSignout}>Sign Out</button>
                </div>
            </form>
        </nav>
        </body>
    )
};

export default NavBar;