import { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import * as CommonHelper from './Common';

export class HomepageEventList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Homepage :D</h1>
            </div>
        );
    }
}