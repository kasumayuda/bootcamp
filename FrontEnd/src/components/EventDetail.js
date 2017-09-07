import { PropTypes, Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import * as CommonHelper from './Common';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {EventImageList} from './EventImageList';
import ReactDOM from 'react-dom';

export class EventDetail extends Component{

    constructor(props){
        super(props);
        this.state = ({
            event:''
        });
    }

    constructEventSchedule = (from, to) => {
        var fromDateTime = new Date(from +'Z');
        var toDateTime = new Date(to +'Z');
        var start = `Schedule: ${fromDateTime.toLocaleDateString()} ${fromDateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}`;
        var finish = this.state.event.from != this.state.event.to ? ` until ${toDateTime.toLocaleDateString()} ${toDateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}`: '';
        return start + finish;        
    }

    render(){
        const style={
            marginLeft:'75px',
            marginTop:'40px',
            width:'80%'
        }
        const rowStyle={
            marginTop:'10px'
        }
        
        return(            
            <div style={style}>                
                <div style={rowStyle}>
                    {this.state.event.name}                
                    <Divider style={rowStyle}/>
                </div>
                <div style={rowStyle}>
                    Location: {this.state.event.location}
                    <Divider style={rowStyle}/>
                </div>
                <div style={rowStyle}>
                    {this.constructEventSchedule(this.state.event.from, this.state.event.to)}
                    <Divider style={rowStyle}/>
                </div>
                <div style={rowStyle}>
                    {this.state.event.description}
                    <Divider style={rowStyle}/>
                </div>
                <div style={rowStyle}>
                    <EventImageList/>
                    <Divider style={rowStyle}/>
                </div>                
                <div style={rowStyle}>
                    <iframe src={CommonHelper.GoogleMapURL(this.state.event.location)} width="100%" height="400px">
                    </iframe>
                    <Divider style={rowStyle}/>
                </div>
            </div>            
        );
    }

    componentDidUpdate(prevProps, prevState){                
        if (this.props.eventID === prevProps.eventID || this.props.eventID == ''){
            return;
        }        
        axios.get(CommonHelper.ExploreJogjaAPIServer() + 'event/GetEventById/' + this.props.eventID)
        .then(response=>{            
            this.setState({
                event:response.data
            });
            
        })
        .catch(function(error){
            alert('sorry buddy...error');
            console.log(error);
        });
    }

}