import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
    return (
        <div className="footer pt-5">
            <p className={"inline-block d-inline-block pr-2"}>Team Quail &copy; 2020</p>
            |
            <Link to="/about" className={"text-decoration-none d-inline-block pl-2"}>
                About
            </Link>
        </div>
    )
}

export default Footer
