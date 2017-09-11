import { Component } from 'react'
import {Menu} from './Menu'
import {LoginForm} from './LoginForm'
import {Logout} from './Logout'
import {EventForm} from './EventForm'
import * as CommonHelper from './Common';
import {ExploreJogjaHomepage} from './ExploreJogjaHomepage'
import {AdminEventList} from './AdminEventList'

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
                    {(this.props.location.pathname === "/") ? <ExploreJogjaHomepage/> : ''}
                    {(this.props.location.pathname === "/login") ? <LoginForm updateOtherComponent={this.handler}/> : ''}
                    {(this.props.location.pathname === "/logout") ? <Logout updateOtherComponent={this.handler}/> : ''}
                    {(this.props.location.pathname === "/create-event") ? <EventForm/> : ''}
                    {(this.props.location.pathname === "/event-list") ? <AdminEventList/> : ''}                    
                </div>
            </div>
        );
    }
}