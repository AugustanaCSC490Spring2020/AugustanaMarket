import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

/**
 * This component is a very basic component for displaying
 * helpful tips for snwering common problems
 */
const FAQ = () => {
    return (
        <React.Fragment>
            <NavBar />
            <div className={"main-content-div"}>
                <div className={"container mt-4"}>
                    <h3 className={"d-inline-block mx-3"}>FAQ</h3>
                    <h5 className={"text-left mt-2"}> Why is my image not displaying?
                    </h5>
                    <h5>If your listing's item is not displaying properly, try editing the listing and resubmitting it without changing anything.</h5>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default FAQ
