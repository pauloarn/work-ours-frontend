import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import User from './pages/User'
import Register from './pages/Register'
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/user" exact component={User} />
                <Route path="/register" exact component={Register} />
            </Switch>
        </BrowserRouter>
    )
}