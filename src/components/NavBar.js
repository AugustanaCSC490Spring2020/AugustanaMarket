import React from 'react';
import {useFirebase} from 'react-redux-firebase';
const NavBar = ({history}) => {
    const firebase = useFirebase();
    const handleSignout = () => {
        firebase.logout().then(history.push('/login'));
    }
    return (
    <div>
        <button onClick={handleSignout}>Sign out</button>
    </div>
    )
}

export default NavBar;