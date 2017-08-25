import { Link } from 'react-router'
import { Component } from 'react'
import HomeIcon from 'react-icons/lib/fa/home'
import AddDayIcon from 'react-icons/lib/fa/calendar-plus-o'
import ListDaysIcon from 'react-icons/lib/fa/table'
import PadlockIcon from 'react-icons/lib/fa/lock'
import PadUnlockIcon from 'react-icons/lib/fa/unlock'
import * as CommonHelper from './Common';

export class Menu extends Component{

    constructor(props){
        super(props);        
        this.ShowLoggedInComponent = this.ShowLoggedInComponent.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props != this.nextProps;
    }

    ShowLoggedInComponent(){
        return (
            <span>
                <Link to="/logout" activeClassName="selected">
                    <PadUnlockIcon/> 
                </Link>
                <Link to="/add-event" activeClassName="selected">
                    <AddDayIcon/>
                </Link>
                <Link to="/event-list" activeClassName="selected">
                    <ListDaysIcon/>
                </Link>  
            </span>
        )
    }

    render(){
        return ( 
            <nav className="menu">
                <Link to="/" activeClassName="selected">
                    <HomeIcon/>
                </Link>
                {(this.props.isUserLoggedIn) ?
                    this.ShowLoggedInComponent() : 
                    <Link to="/login" activeClassName="selected">
                        <PadlockIcon/>
                    </Link>
                }                
            </nav>
        )
    }
}