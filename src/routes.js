import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom';
import queryform from './components/queryform'
import postanswer from './components/post_answer'
import getanswer from './components/getanswer'
import Login from './components/login'
import Nav1 from './components/header'
import home from './components/main'
import querylist from './components/querylist'
import st_querylist from './components/st_querylist'
import dropdown from './components/dropdown'
import register from './components/register'
import Nav2 from './components/header2'
import RouterGuard from './routerGuard';
import { AuthContext } from './contextapi/authContext';

const Routes = () => {
    // const [isAutheticated, setIsAutheticated] = useContext(AuthContext).auth;
    const [isLoggedin, setIsLoggedin] = useContext(AuthContext).login;

    if (!(localStorage.getItem("token") === null)) {
        setIsLoggedin(true)
    }

    return (
        <BrowserRouter>
            <Nav1 />
            <RouterGuard
                path='/queryform'
                exact
                component={queryform}
                auth={!isLoggedin}
                redirect='/login'
            />
            <RouterGuard
                path='/postanswer/:id'
                exact
                component={postanswer}
                auth={!isLoggedin}
                redirect='/login'
            />
            <Route
                path='/getanswer/:id'
                exact
                component={getanswer}
            />
            <Route
                path='/login'
                exact
                component={Login}
                auth={!isLoggedin}
                redirect='/login'
            />
            <Route
                path='/'
                exact
                component={home}
            />
            <RouterGuard
                path='/querylist/'
                exact
                component={querylist}
                auth={!isLoggedin}
                redirect='/login'
            />
            <Route path='/st_querylist/' exact component={st_querylist} />
            <Route path='/dropdown' exact component={dropdown} />
            <Route path='/register' exact component={register} />
            {/* <Switch>
             <Redirect from='/querylist/:id' to='/getanswer/:id'/>
             <Route path='/getanswer/:id'/>
           </Switch> */}

        </BrowserRouter>
    )
}

export default Routes
