import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Login from './components/Login';
const Router = () => (
    <div className="appDisplay">
        <Switch>
            <Route path="/" component={Login}/>
        </Switch>
    </div>
)

export default Router;