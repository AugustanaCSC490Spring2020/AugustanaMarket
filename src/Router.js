import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Login from './components/Login';
import ItemList from './components/ItemList';
import CreateItem from './components/CreateItem';
import Item from './components/Item';
import PageNotFound from './components/PageNotFound';
import Search from './components/Search';
import About from './components/About';
import FAQ from './components/FAQ';

/**
 * This component is a custom route (a route is basically url)
 * for the react router where it makes it private. Being 
 * private means that only users that are authenticated can 
 * access the route and if the user is not authenticated, 
 * they will be redirected to login to be authenticated. 
 * This is so that if an unauthenticated user tries to go
 * to a route that is private, they cannot.
 * @param component the route that is being used. The variable
 * is being called RouteComponent here. 
 */
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    // source http://react-redux-firebase.com/docs/recipes/auth.html
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

const OnlyPublicRoute = ({component: RouteComponent, ...rest}) => {
    const auth = useSelector(state => state.firebase.auth);
    return (
        <Route
            {...rest}
            render={(routeProps) => 
                isLoaded(auth) && isEmpty(auth) ? <RouteComponent {...routeProps}/> :
                <Redirect to='/' />}
        />
    )
}

/**
 * This component is the router which allows the user to use
 * different urls to access different components. This is
 * accomplished by using a switch statement where it will
 * load the component that matches the first path (url). You
 * can pass information through the url by doing :varName so that
 * a more generalized url is allowable such as having the same
 * component loaded but with slight differences. If the url
 * does not match any of the possible paths, the last option
 * catches all other urls. If the user is authenticated, then
 * it will give the component for page not found, but if the
 * user is not authenticated, then they are redirected to login.
 */
const Router = () => {
    const auth = useSelector((state) => state.firebase.auth);
    return (
    <div className="appDisplay">
        <Switch>
            <PrivateRoute exact path="/" component={Search}/>
            <OnlyPublicRoute exact path='/login' component={Login}/>
            <PrivateRoute exact path='/search' component={Search} />
            <PrivateRoute path="/list/:type/:uid" component={ItemList}/>
            <PrivateRoute path='/view/:item/:type' component={Item}/>
            <PrivateRoute path='/:production/:type/:item' component={CreateItem}/>
            <PrivateRoute path="/about" component={About}/>
            <PrivateRoute path="/FAQ" component={FAQ}/>
            
            {isEmpty(auth) ? <Redirect to='/login'/> : <Route component={PageNotFound} />}
        </Switch>
    </div>
    );
};

export default Router;
