import React from 'react';

/**
 * This component is used to display that the url the user has
 * entered does not exist where it gives the effect of a 404 error.
 * The user can go back to the homepage by clicking on the button.
 */
const PageNotFound = () => {
    return <div className="error-container">
        <i>
            <div className="glitch" data-text="404 ERROR">404</div>
            <div className="glow">404 ERROR</div>
        </i>
        <p className="subtitle">Sorry, the page you were looking for cannot be found.</p>
        <br />
        <a href='/' id="go-home-btn">GO HOME</a>
    </div>;
};

export default PageNotFound