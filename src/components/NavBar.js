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
                {/*<input className="form-control mr-sm-2 form-inline" type="search" placeholder="Search" aria-label="Search"/>*/}
                {/*<button className="btn btn-outline-success form-inline my-2 my-sm-0" type="submit">Search</button>*/}
                <div className="collapse navbar-collapse mr-2"
                     id="navcol-1">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle nav-link">Create</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/create/sell/new">An item for sale</a>
                                <a className="dropdown-item" href="/create/request/new">A request for an item</a>
                            </div>
                        </li>
                        <li className="nav-item"><a className="nav-link" href={`/list/sell/${firebase.auth().currentUser.uid}`}>View Listings</a></li>
                        <li className="nav-item"><a className="nav-link" href={`/list/request/${firebase.auth().currentUser.uid}`}>Requests</a></li>
                    </ul>
                </div><button id={"signout-btn"} type="button" onClick={handleSignout}>Sign Out</button>
            </form>

        </nav>
    )
};

export default NavBar;