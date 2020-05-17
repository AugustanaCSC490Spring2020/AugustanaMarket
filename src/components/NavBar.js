import React from 'react';
import {useFirebase} from 'react-redux-firebase';
import './styles/NavBar.css';
import {useDispatch, useSelector} from 'react-redux';
import {switchSearch} from '../redux/actions';
import {Link} from 'react-router-dom';


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
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);
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
                        <li className="nav-item"><a className="nav-link" onClick={() => dispatch(switchSearch(true))} href={`/search`}>Listings</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => dispatch(switchSearch(false))} href={`/search`}>Requests</a></li>
                    </ul>
                    <div className="dropdown ml-3">
                        <a className="dropdown-toggle text-decoration-none text-light" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={profile.avatarUrl} className={"profile-img"}></img>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right text-left pl-3" aria-labelledby="dropdownMenuLink">
                            <h5 className={"mb-2"}>{profile.displayName}</h5>
                            <div className={"mb-1 hover-link"}>
                                <i className="fa fa-heart-o pr-1"></i>
                                <a href={"/list/sell/favorites"} className={"text-decoration-none text-dark mt-5 like-btn"}>My Favorites</a>
                            </div>
                            <div className={"mb-0 pb-0 hover-link"}>
                                <i className="fa fa-sign-out d-inline-block pr-1"></i>
                                <a className="d-inline-block mb-0" onClick={handleSignout}>Sign Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    )
};

export default NavBar;