import React from 'react';
import { useSelector } from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import './styles/NavBar.css';

const NavBar = () => {
    const firebase = useFirebase();
    const auth = useSelector((state) => state.firebase.auth);
    const handleSignout = () => {
        firebase.logout();
    };
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-div">
            <form className="form-inline">
                <img src={"../textbook_2x.png"} id={"nav-img"}/>
                <a className="navbar-brand" id={"navbar-title"} href={'/'}>Augustana Marketplace</a>
                <a className="form-inline nav-link" href='/create/request'>Request</a>
                <a className="form-inline nav-link" href='/create/sell'>Sell</a>
                <a className="form-inline nav-link" href='/list/sell'>Listings</a>
                <a className="form-inline nav-link" href='/list/request'>Requested Items</a>
                <input className="form-control mr-sm-2 form-inline" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success form-inline my-2 my-sm-0" type="submit">Search</button>
                <button className={""} id="signout-btn" onClick={handleSignout}>Sign Out</button>
            </form>
        </nav>
    )
};

export default NavBar;