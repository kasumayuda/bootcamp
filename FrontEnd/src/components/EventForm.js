import { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';
import * as CommonHelper from './Common';


export class EventForm extends Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
        this.formEventIsValid = this.formEventIsValid.bind(this);
        this.state = {
            name:'',
            location:'',
            description:'',
            startDate:new Date(),
            startTime:new Date(),
            finishDate:new Date(),
            finishTime:new Date(),
            errors:{}
        };

     
    }
    
    formEventIsValid(){        
        var isFormValid = true;
        this.setState({
            errors:{}
        });

        var nameError = Object.assign(this.state.errors, {name: this.state.name === "" ? "Event name is required" : ""});
        this.setState({ errors: nameError });

        var locationError = Object.assign(this.state.errors, {location: this.state.location === "" ? "Location is required" : ""});
        this.setState({ errors: locationError });            
    
        var descriptionError = Object.assign(this.state.errors, {description: this.state.description === "" ? "Description is required" : ""});
        this.setState({ errors: descriptionError });            
        
        if (this.state.name === "" || this.state.location === "" || this.state.description === ""){
            isFormValid = false;
        }

        if (this.state.startDate.valueOf() != this.state.finishDate.valueOf() && this.state.finishDate.valueOf() < this.state.startDate.valueOf()){
            var startDateError = Object.assign(this.state.errors, {startDate: "Start date can't be later than finish date"});
            this.setState({ errors: startDateError });
            isFormValid = false;
        }else{
            var startDateError = Object.assign(this.state.errors, {startDate: ""});
            this.setState({ errors: startDateError });
        }
        
        if (this.state.startDate.valueOf() === this.state.finishDate.valueOf() && this.state.finishTime.getTime() < this.state.startTime.getTime()){
            var startTimeError = Object.assign(this.state.errors, {startTime: "Start time can't be later than finish time"});
            this.setState({ errors: startTimeError });
            isFormValid = false;
        }else{
            var startTimeError = Object.assign(this.state.errors, {startTime: ""});
            this.setState({ errors: startTimeError });
        }

        return isFormValid;

    }

    submit(e){
        if (this.formEventIsValid()){
            var startDate = this.state.startDate;
            var startTime = this.state.startTime;
            var startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes());
            
            var finishDate = this.state.finishDate;
            var finishTime = this.state.finishTime;
            var finishDateTime = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate(), finishTime.getHours(), finishTime.getMinutes());
            
            var params = new URLSearchParams();
            params.append('Name',this.state.name);
            params.append('Location',this.state.location);
            params.append('Description',this.state.description);
            params.append('From', startDateTime);
            params.append('To', finishDateTime);
            var headers ={ 
                headers: {
                    'Content-Type':'application/json; charset=utf-8',
                    'Accept':'application/json',
                    'Authorization' : `Bearer ${CommonHelper.GetCurrentUserToken()}`
                }
            };
            axios.post(CommonHelper.ExploreJogjaAPIServer() + 'event/create' , params, headers)
            .then((response)=>{
                
            })
            .catch(function(error){
                alert('sorry buddy...error');
                console.log(error);
            })
        }
        e.preventDefault();
    }

    reset(e){
        this.refNameInput.getInputNode().value = '';
        this.refLocationInput.getInputNode().value = '';
        this.refDescriptionInput.getInputNode().value = '';
                
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
        if (!CommonHelper.IsUserLoggedIn()){
            browserHistory.push('/');
            return <Link to='/'/>;
        }else{
            let DateTimeFormat = Intl.DateTimeFormat;
            return (
                <MuiThemeProvider>                
                    <form onSubmit={this.submit} className="login-form">
                        <h1>Register New Event</h1>
                        <div className="row">                    
                            <TextField  id="name"
                                        type="text"
                                        hintText="Enter event name"
                                        floatingLabelText="Name"
                                        errorText={this.state.errors.name}     
                                        value={this.state.name}                                    
                                        onChange = {(event, value)=> this.setState({name:value})}
                                        ref = {(input) => {this.refNameInput = input;}}/>
                        </div>
                        <div className="row">
                            <TextField  id="location"
                                        hintText="Enter event location"
                                        floatingLabelText="Location"
                                        errorText={this.state.errors.location}     
                                        type="text"        
                                        value={this.state.location}
                                        onChange = {(event, value)=> this.setState({location:value})}
                                        ref = {(input) => {this.refLocationInput = input;}}/>
                        </div>
                        <div className="row">
                            <TextField  id="description"
                                        hintText="Enter event description"
                                        floatingLabelText="Description"
                                        errorText={this.state.errors.description}     
                                        type="text"
                                        multiLine={true}
                                        value={this.state.description}
                                        onChange = {(event, value)=> this.setState({description:value})}
                                        ref = {(input) => {this.refDescriptionInput = input;}}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <DatePicker id="from-date" 
                                        DateTimeFormat={DateTimeFormat} 
                                        locale="id-ID" 
                                        hintText="Enter start date" 
                                        floatingLabelText="Start Date" 
                                        errorText={this.state.errors.startDate}
                                        onChange = {(event, value)=> this.setState({startDate:value})}
                                        mode="landscape"
                                        value={this.state.startDate} 
                                        ref = {(input) => {this.refStartDateInput = input;}}/>
                            </div>
                            <div className="col-md-6">
                                <TimePicker id="to-time" 
                                            format="24hr" 
                                            hintText="Enter start time" 
                                            errorText={this.state.errors.startTime}
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
                                            DateTimeFormat={DateTimeFormat} 
                                            locale="id-ID" 
                                            errorText={this.state.errors.finishDate}
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
                                            errorText={this.state.errors.finishTime}
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
}