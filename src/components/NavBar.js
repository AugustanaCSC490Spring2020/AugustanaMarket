import React from 'react';
import { useSelector } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import './styles/NavBar.css';

const NavBar = () => {
    const firebase = useFirebase();
    const auth = useSelector((state) => state.firebase.auth);
    const handleSignout = () => {
        firebase.logout();
    };
    return (
        <body>
        <nav className="navbar navbar-expand-lg fixed-top navbar-div">
            <form className="form-inline">
                <img src={"../textbook_2x.png"} id={"nav-img"}/>
                <a className="navbar-brand" id={"navbar-title"}>Augustana Marketplace</a>
                <a className="form-inline nav-link" href='/create/request'>Request</a>
                <a className="form-inline nav-link" href='/create/sell'>Sell</a>
                <div className={"form-inline ml-5"}>
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </div>
                <button className="" id="signout-btn" onClick={handleSignout}>Sign Out</button>
            </form>
        </nav>
        </body>
    )
};

export default NavBar;