import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import NavBar from './components/NavBar';
import Login from './components/Login';
import ItemList from './components/ItemList';
import CreateSellItem from './components/CreateSellItem';
import HomePage from './components/HomePage';
import Item from './components/Item'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const auth = useSelector((state) => state.firebase.auth);
    return (
        <Route
            {...rest}
            render={(routeProps) =>

                    isLoaded(auth) && !isEmpty(auth) ? <RouteComponent {...routeProps} /> :
                    <Redirect to='/login' />}
        />
    );
};

const pageNotFound = () => {
    return <div class="error-container">
        <i>
            <div class="glitch" data-text="404 ERROR">404</div>
            <div class="glow">404 ERROR</div>
        </i>
        <p class="subtitle">Sorry, the page you were looking for cannot be found.</p>
        <br />
        <a href='./' id="go-home-btn">GO HOME</a>
    </div>;
};

const Router = () => {
    const auth = useSelector((state) => state.firebase.auth);
    return (
    <div className="appDisplay">
        <Switch>
            <PrivateRoute exact path="/" component={NavBar}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute path='/create/:type' component={CreateSellItem}/>
            <PrivateRoute path="/list/:type" component={ItemList}/>
            <PrivateRoute path='/view/:item/:type' component={Item}/>
            {isEmpty(auth) ? <Redirect to='/login'/> : <Route component={pageNotFound} />}
        </Switch>
    </div>
    );
};

export default Router;
