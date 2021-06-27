import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import './mainStyle.css'
import AppProvider from '../../AppContextApi/contexts/AppContext';

import Home from '../Home/Home';
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';

function MainComponent() {
    return (
        <AppProvider>
            <Router>
                <Switch>
                    <Route path="/" exact><Home /></Route>
                    <Route path="/login" exact><Login /></Route>
                    <Route path="/sign-up" exact><SignUp /></Route>
                    <Route path="/userProfile"><UserProfile /></Route>
                </Switch>
            </Router> 
        </AppProvider>
    )
}

export default MainComponent
