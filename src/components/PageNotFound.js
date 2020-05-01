import React from 'react';

const PageNotFound = () => {
    return <div class="error-container">
        <i>
            <div class="glitch" data-text="404 ERROR">404</div>
            <div class="glow">404 ERROR</div>
        </i>
        <p class="subtitle">Sorry, the page you were looking for cannot be found.</p>
        <br />
        <a href='/' id="go-home-btn">GO HOME</a>
    </div>;
};

export default PageNotFound