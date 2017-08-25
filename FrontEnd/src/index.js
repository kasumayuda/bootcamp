import React from 'react'
import {render} from 'react-dom'
import './stylesheets/ui.scss'
import './stylesheets/index.scss'
import {App} from './components/App'
import {PageNotFound} from './components/PageNotFound'
import { Router, Route, hashHistory } from 'react-router'

window.React = React

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="login" component={App}/>
        <Route path="logout" component={App}/>
        <Route path="*" component={PageNotFound}/>
    </Router>
    ,document.getElementById('main')
);