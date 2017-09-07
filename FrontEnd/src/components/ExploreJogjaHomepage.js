import { PropTypes, Component } from 'react'
// import { Link, browserHistory } from 'react-router';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
import {EventList} from './EventList';
import {SearchEventForm} from './SearchEventForm';

export class ExploreJogjaHomepage extends Component{
    constructor(props){
        super(props);        
    }

    render(){        
        
        return (
            <div>
                <div>
                    {<SearchEventForm/>}
                </div>
                <div>
                    {<EventList/>}
                </div>
            </div>
        );
    }
}