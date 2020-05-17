import React from 'react';
import NavBar from './NavBar';

/**
 * This component is a very basic component for displaying what the 
 * application is and who made it
 */
const About = () => {
    return (
        <React.Fragment>
            <NavBar />
            <div className={"container mt-4"}>
                <h3 className={"d-inline-block mx-3"}>Simplicity</h3>
                <h3 className={"d-inline-block mx-3"}>Innovation</h3>
                <h3 className={"d-inline-block mx-3"}>Exclusivity</h3>
                <h5 className={"text-left mt-2"}>These are the three main principles that we, Team Quail, wanted to embody in the Augustana Marketplace.
                    When beginning the project, Team Quail was just a group of four Augustana students who recognized a problem,
                    the lack of reliable methods to sell used textbooks on campus.
                    Student had the options of selling their used books back to the Augustana bookstore, to friends, or through online vendors.
                    Unfortunately, these methods were both inconvenient and costly for cash-strapped college students.
                </h5>
                <h5 className={"text-left"}>Throughout our creation process, we kept these students in mind and attempted to make an app that is user-friendly
                  and simple. Our user-interface is intuitive and navigation between pages is quick and easy.
                  Above all, Team Quail focused on keeping the Marketplace safe and secure.
                  Users can rest assured knowing that only people with an Augustana email address can see listing and other students’ information.
                  With that, we hope this app helps the Augustana community. Go Vikings!</h5>
            </div>
        </React.Fragment>
    )
}

export default About
