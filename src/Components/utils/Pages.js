import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import {DataContext} from '../../store/GlobalState'
import Home from '../Home'
import Login from '../Login'
import Notes from '../Notes'
import Users from '../users'
import NotFound from './NotFound'

const Pages = () => {
    const {state, dispatch} = useContext(DataContext)
    const { auth } = state
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/notes" exact component= { auth.user ? Notes : Login } />
            <Route path="/users" exact component={ auth.user && auth.user.role === 'ADMIN' ? Users : Home } />
            <Route path="*" exact component= {NotFound} />
        </Switch>
    )
}

export default Pages
