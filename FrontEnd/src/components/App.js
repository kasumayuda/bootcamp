import { Component } from 'react'
import {Menu} from './Menu'
import {LoginForm} from './LoginForm'
import {Logout} from './Logout'
import * as CommonHelper from './Common';

export class App extends Component{

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            loggedIn : CommonHelper.IsUserLoggedIn()
        }
    }

    handler(e){
        this.setState({loggedIn : CommonHelper.IsUserLoggedIn()});
    }

    shouldComponentUpdate(nextProps, nextState){
        return !(this.state === this.nextState);
    }
    
    render(){        
        return (
            <div className="app">
                <Menu isUserLoggedIn = {this.state.loggedIn}/>
                <div className="content">
                    {(this.props.location.pathname === "/login") ? <LoginForm updateOtherComponent={this.handler}/> : ''}
                    {(this.props.location.pathname === "/logout") ? <Logout updateOtherComponent={this.handler}/> : ''}
                </div>
            </div>
        );
    }
}