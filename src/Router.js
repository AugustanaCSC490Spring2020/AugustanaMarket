import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import NavBar from './components/NavBar';
import Login from './components/Login';
import ItemList from './components/ItemList';
import CreateItem from './components/CreateItem';
import HomePage from './components/HomePage';
import Item from './components/Item'
import PageNotFound from './components/PageNotFound'


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



const Router = () => {
    const auth = useSelector((state) => state.firebase.auth);
    return (
    <div className="appDisplay">
        <Switch>
            <PrivateRoute exact path="/" component={NavBar}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute path="/list/:type/:uid" component={ItemList}/>
            <PrivateRoute path='/view/:item/:type' component={Item}/>
            <PrivateRoute path='/:production/:type/:item' component={CreateItem}/>
            
            {isEmpty(auth) ? <Redirect to='/login'/> : <Route component={PageNotFound} />}
        </Switch>
    </div>
    );
};

export default Router;
