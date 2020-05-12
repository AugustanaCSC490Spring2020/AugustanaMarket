import React from 'react';
import {useFirebase} from 'react-redux-firebase';
import './styles/NavBar.css';

/**
 * This component is the navigation bar where links to 
 * other parts of the application are displayed. It also
 * includes a way for the user to sign out. Thiscomponent
 * is used in many different components so that it appears
 * that the component never really "changed". This is only
 * present in components with private routes.
 */
const NavBar = () => {
    const firebase = useFirebase();
    /**
     * This method signs the user out from firebase.
     * This results in a redirect to login from the router
     * since the user is not logged in
     */
    const handleSignout = () => {
        firebase.logout();
    };
    return (
        <nav className="navbar navbar-dark navbar-div navbar-expand-md navigation-clean">
            <div className="container nav-container">
                <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span></button>
                <img src={"../../textbook_2x.png"} id={"nav-img"}/>
                <a className="navbar-brand" id={"navbar-title"} href={'/'}>Augustana Marketplace</a>
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
                        <li className="nav-item"><a className="nav-link" href={`/search`}>Search</a></li>
                        <li className="nav-item"><a className="nav-link" href={`/list/sell/${firebase.auth().currentUser.uid}`}>View Listings</a></li>
                        <li className="nav-item"><a className="nav-link" href={`/list/request/${firebase.auth().currentUser.uid}`}>Requests</a></li>
                    </ul>
                </div><button id={"signout-btn"} type="button" onClick={handleSignout}>Sign Out</button>
            </div>

        </nav>
    )
};

export default NavBar;