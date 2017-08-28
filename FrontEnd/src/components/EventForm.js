import { PropTypes, Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';
import * as CommonHelper from './Common';
import { Link } from 'react-router';

export class EventForm extends Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {
            name:'',
            location:'',
            description:'',
            startDate:new Date(),
            startTime:new Date(),
            finishDate:new Date(),
            finishTime:new Date()
        };

     
    }
    
    submit(e){
        e.preventDefault();
    }

    reset(e){
        this.refNameInput.getInputNode().value = '';
        this.refLocationInput.getInputNode().value = '';
        this.refDescriptionInput.getInputNode().value = '';
        // this.refStartDateInput.getInputNode().value = new Date();
        // this.refStartTimeInput.getInputNode().value = new Date();
        // this.refFinishDateInput.getInputNode().value = new Date();
        // this.refFinishTimeInput.getInputNode().value = new Date();
        
        console.log('sdff');
        this.state = {
            name:'',
            location:'',
            description:'',
            startDate:new Date(),
            startTime:new Date(),
            finishDate:new Date(),
            finishTime:new Date()
        };
        e.preventDefault();
    }

    render(){
        return (
            <MuiThemeProvider>                
                <form onSubmit={this.submit} className="login-form">
                    <h1>Register New Event</h1>
                    <div className="row">                    
                        <TextField  id="name"
                                    type="text"
                                    hintText="Enter event name"
                                    floatingLabelText="Name"
                                    required     
                                    value={this.state.name}
                                    onChange = {(event, value)=> this.setState({name:value})}
                                    ref = {(input) => {this.refNameInput = input;}}
                                    />
                    </div>
                    <div className="row">
                        <TextField  id="location"
                                    hintText="Enter event location"
                                    floatingLabelText="Location"
                                    type="text"        
                                    value={this.state.location}
                                    onChange = {(event, value)=> this.setState({location:value})}
                                    ref = {(input) => {this.refLocationInput = input;}}
                                    />
                    </div>
                    <div className="row">
                        <TextField  id="description"
                                    hintText="Enter event description"
                                    floatingLabelText="Description"
                                    type="text"
                                    multiLine={true}
                                    value={this.state.description}
                                    onChange = {(event, value)=> this.setState({description:value})}
                                    ref = {(input) => {this.refDescriptionInput = input;}}
                                    />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <DatePicker id="from-date" 
                                        hintText="Enter start date" 
                                        floatingLabelText="Start Date" 
                                        onChange = {(event, value)=> this.setState({startDate:value})}
                                        mode="landscape"
                                        value={this.state.startDate} 
                                        ref = {(input) => {this.refStartDateInput = input;}}/>
                        </div>
                        <div className="col-md-6">
                            <TimePicker id="to-time" 
                                        format="24hr" 
                                        hintText="Enter start time" 
                                        floatingLabelText="Start Time" 
                                        onChange = {(event, value)=> this.setState({startTime:value})}
                                        mode="landscape" 
                                        value={this.state.startTime}
                                        ref = {(input) => {this.refStartTimeInput = input;}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <DatePicker id="to-date" 
                                        hintText="Enter end date" 
                                        floatingLabelText="End Date" 
                                        onChange = {(event, value)=> this.setState({finishDate:value})}
                                        mode="landscape" 
                                        value={this.state.finishDate}
                                        ref = {(input) => {this.refFinishDateInput = input;}}/>
                        </div>
                        <div className="col-md-6">
                            <TimePicker id="to-time" 
                                        format="24hr" 
                                        hintText="Enter end time" 
                                        floatingLabelText="End Time" 
                                        onChange = {(event, value)=> this.setState({finishTime:value})}
                                        mode="landscape" 
                                        value={this.state.finishTime}
                                        ref = {(input) => {this.refFinishTimeInput = input;}}/>
                        </div>
                    </div>                    
                    <div className="row">
                        <RaisedButton label="Submit" onClick={(this.submit)}/>
                        <RaisedButton label="Reset" onClick={(this.reset)}/>
                    </div>
                </form>
            </MuiThemeProvider>
        );
    }
}