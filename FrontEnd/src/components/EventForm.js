import { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';
import * as CommonHelper from './Common';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import update from 'immutability-helper';

export class EventForm extends Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
        this.formEventIsValid = this.formEventIsValid.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.assignEventState = this.assignEventState.bind(this);
        this.assignEventDialog = this.assignEventDialog.bind(this);
        this.submitEvent = this.submitEvent.bind(this);

        this.state = {
            event:{
                name:'',
                location:'',
                description:'',
                startDate:new Date(),
                startTime:new Date(),
                finishDate:new Date(),
                finishTime:new Date()
            },
            errorMessages:{
                name:'',
                location:'',
                description:'',
                startDate:'',
                startTime:'',
                finishDate:'',
                finishTime:''
            },
            dialogSetup:{
                dialogOpen: false,
                dialogClose: false,
                popupMessage: '',
                dialogTitle: ''
            }            
        };
    }
    
    assignEventState(field, attribute){
        var temp = update(this.state.event, {
            [field]: {$set: attribute}
        });
    
        this.setState({
            event: temp
        });
    }
    
    assignEventDialog(field, attribute){
        var temp = update(this.state.dialogSetup, {
            [field]: {$set: attribute}
        });
        
        this.setState({
            dialogSetup: temp
        });
    }

    formEventIsValid(){
        var isFormValid = true;       

        var startDateMessage = '';
        if (this.state.event.startDate.valueOf() != this.state.event.finishDate.valueOf() && this.state.event.finishDate.valueOf() < this.state.event.startDate.valueOf()){
            startDateMessage = "Start date can't be later than finish date";
        }

        var startTimeMessage = '';
        if (this.state.event.startDate.valueOf() === this.state.event.finishDate.valueOf() && this.state.event.finishTime.getTime() < this.state.event.startTime.getTime()){
            startTimeMessage = "Start time can't be later than finish time";
        }

        this.setState({
            errorMessages:{
                name: this.state.event.name === "" ? 'Event name is required' : "",
                location: this.state.event.location === "" ? "Location is required" : "",
                description: this.state.event.description === "" ? "Description is required" : "",
                startDate: startDateMessage,
                startTime: startTimeMessage,
            }
        });
        
        return isFormValid;
    }

    submit(e){        
        if (this.formEventIsValid()){
            this.submitEvent();
        }
        e.preventDefault();
    }

    submitEvent(){
        var startDate = this.state.event.startDate;
        var startTime = this.state.event.startTime;
        var startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes());
        
        var finishDate = this.state.event.finishDate;
        var finishTime = this.state.event.finishTime;
        var finishDateTime = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate(), finishTime.getHours(), finishTime.getMinutes());
       
        console.log('submit');
        
        var config ={ 
            headers: {
                'Content-Type':'application/json; charset=utf-8',
                'Authorization' : `Bearer ${CommonHelper.GetCurrentUserToken()}`
            },
            data:{
                'Name': this.state.event.name,
                'Location': this.state.event.location,
                'Description': this.state.event.description,
                'From':  startDateTime,
                'To':  finishDateTime
            }
        };
        axios.post(CommonHelper.ExploreJogjaAPIServer() + 'event/create',{} , config)
        .then((response)=>{                
            this.setState({
                dialogSetup:{
                    dialogOpen: true,
                    dialogClose: false,
                    popupMessage:'Event saved',
                    dialogTitle: 'Event submission'
                }                
            });
            //this.openDialog();
        })
        .catch((error)=>{
            this.setState({
                dialogSetup:{
                    dialogOpen: true,
                    dialogClose: false,
                    popupMessage:'Failed to save event',
                    dialogTitle: 'Event submission'
                }                
            });
            
            //this.openDialog();
            console.log(error);
        })
    }

    reset(e){
        this.refNameInput.getInputNode().value = '';
        this.refLocationInput.getInputNode().value = '';
        this.refDescriptionInput.getInputNode().value = '';
                
        this.state = {
            event:{
                name:'',
                location:'',
                description:'',
                startDate:new Date(),
                startTime:new Date(),
                finishDate:new Date(),
                finishTime:new Date(),
            },
            errorMessages:{},
            dialogSetup:{
                dialogOpen: false,
                dialogClose: false,
                popupMessage: '',
                dialogTitle: ''
            }            
        };
        e.preventDefault();
    }

    openDialog(){        
        this.assignEventDialog('dialogOpen', true);
    }

    closeDialog(){
        this.setState({
            dialogSetup:{
                dialogOpen: false,
                dialogClose: true,
                popupMessage:'',
                dialogTitle: ''
            }                
        });
    }

    render(){
        if (!CommonHelper.IsUserLoggedIn()){
            browserHistory.push('/');
            return <Link to='/'/>;
        }else{
            
            const actions = [
                <FlatButton
                  label="Close"
                  primary={true}
                  onClick={this.closeDialog}
                />
              ];
            let DateTimeFormat = Intl.DateTimeFormat;
            return (
                <div>                 
                <MuiThemeProvider>
                    <Dialog actions={actions}
                            modal={false}
                            open={this.state.dialogSetup.dialogOpen}
                            onRequestClose={this.closeDialog}
                            title={this.state.dialogSetup.dialogTitle}>
                        {this.state.dialogSetup.popupMessage}
                    </Dialog> 
                </MuiThemeProvider>                     
                <MuiThemeProvider>                       
                    <form onSubmit={this.submit} className="login-form">
                        <h1>Register New Event</h1>
                        <div className="row">                    
                            <TextField  id="name"
                                        type="text"
                                        hintText="Enter event name"
                                        floatingLabelText="Name"
                                        errorText={this.state.errorMessages.name}     
                                        value={this.state.event.name}                                    
                                        onChange = {(event, value)=> this.assignEventState('name', value)}
                                        ref = {(input) => {this.refNameInput = input;}}/>
                        </div>
                        <div className="row">
                            <TextField  id="location"
                                        hintText="Enter event location"
                                        floatingLabelText="Location"
                                        errorText={this.state.errorMessages.location}     
                                        type="text"        
                                        value={this.state.event.location}
                                        onChange = {(event, value)=> this.assignEventState('location', value)}
                                        ref = {(input) => {this.refLocationInput = input;}}/>
                        </div>
                        <div className="row">
                            <TextField  id="description"
                                        hintText="Enter event description"
                                        floatingLabelText="Description"
                                        errorText={this.state.errorMessages.description}     
                                        type="text"
                                        multiLine={true}
                                        fullWidth={true}
                                        value={this.state.event.description}
                                        onChange = {(event, value)=> this.assignEventState('description', value)}
                                        ref = {(input) => {this.refDescriptionInput = input;}}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <DatePicker id="from-date" 
                                        DateTimeFormat={DateTimeFormat} 
                                        locale="id-ID" 
                                        hintText="Enter start date" 
                                        floatingLabelText="Start Date" 
                                        errorText={this.state.errorMessages.startDate}
                                        onChange = {(event, value)=> this.assignEventState('startDate', value)}
                                        mode="landscape"
                                        value={this.state.event.startDate} 
                                        ref = {(input) => {this.refStartDateInput = input;}}/>
                            </div>
                            <div className="col-md-6">
                                <TimePicker id="to-time" 
                                            format="24hr" 
                                            hintText="Enter start time" 
                                            errorText={this.state.errorMessages.startTime}
                                            floatingLabelText="Start Time" 
                                            onChange = {(event, value)=> this.assignEventState('startTime', value)}
                                            mode="landscape" 
                                            value={this.state.event.startTime}
                                            ref = {(input) => {this.refStartTimeInput = input;}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <DatePicker id="to-date" 
                                            DateTimeFormat={DateTimeFormat} 
                                            locale="id-ID" 
                                            errorText={this.state.errorMessages.finishDate}
                                            hintText="Enter end date" 
                                            floatingLabelText="End Date" 
                                            onChange = {(event, value)=> this.assignEventState('finishDate', value)}
                                            mode="landscape" 
                                            value={this.state.event.finishDate}
                                            ref = {(input) => {this.refFinishDateInput = input;}}/>
                            </div>
                            <div className="col-md-6">
                                <TimePicker id="to-time" 
                                            format="24hr" 
                                            errorText={this.state.errorMessages.finishTime}
                                            hintText="Enter end time" 
                                            floatingLabelText="End Time" 
                                            onChange = {(event, value)=> this.assignEventState('finishTime', value)}
                                            mode="landscape" 
                                            value={this.state.event.finishTime}
                                            ref = {(input) => {this.refFinishTimeInput = input;}}/>
                            </div>
                        </div>                    
                        <div className="row">
                            <RaisedButton label="Submit" onClick={(this.submit)}/>
                            <RaisedButton label="Reset" onClick={(this.reset)}/>
                        </div>
                    </form>
                </MuiThemeProvider>
                </div>
            );
        }
    }

}