import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import NavBar from './components/NavBar';
import Login from './components/Login';
import ItemList from './components/ItemList';
import CreateSellItem from './components/CreateSellItem';
import HomePage from './components/HomePage';

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
    return <div>404 Page not found</div>;
};

const Router = () => {
    const auth = useSelector((state) => state.firebase.auth);
    return (
    <div className="appDisplay">
        <Switch>
            <PrivateRoute exact path="/" component={NavBar}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path="/list" component={ItemList}/>
            <PrivateRoute path='/create/:type' component={CreateSellItem}/>
            {isEmpty(auth) ? <Redirect to='/login'/> : <Route component={pageNotFound} />}
        </Switch>
    </div>
    );
};

export default Router;
