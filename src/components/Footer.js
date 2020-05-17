import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="page-footer fixed-bottom">
            <p className={"inline-block d-inline-block pr-2"}>Team Quail &copy; 2020</p>
            |
            <Link to="/about" className={"text-decoration-none d-inline-block pl-2"}>
                About
            </Link>
        </footer>
    )
}

export default Footer
