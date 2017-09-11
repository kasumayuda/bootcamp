import { PropTypes, Component } from 'react'
import axios from 'axios';
import * as CommonHelper from './Common';
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import { EventDetail } from './EventDetail';

export class AdminEventList extends Component{
    constructor(props){
        super(props);
        this.state=({
            events:[],
            open:false,
            selectedEventID:''
        });        
        this.openDetail = this.openDetail.bind(this);
    }

    componentWillMount(){        
        var config ={ 
            headers: {
                'Content-Type':'application/json; charset=utf-8',
                'Authorization' : `Bearer ${CommonHelper.GetCurrentUserToken()}`
            }
        };
        axios.get(CommonHelper.ExploreJogjaAPIServer() + 'event/GetAdminEventList', config)
        .then(response=>{            
            this.setState({
                    events:response.data.value
                });                
        })
        .catch(function(error){
                alert('sorry buddy...error');
                console.log(error);
        });
    }

    openDetail(eventID){
        this.setState({
            open: !this.state.open,
            selectedEventID:this.state.open === true ? eventID:''
        });     
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.selectedEventID == "" || nextState.selectedEventID != this.state.selectedEventID;
    }

    render(){
        if (!CommonHelper.IsUserLoggedIn()){
            browserHistory.push('/');
            return <Link to='/'/>;
        }else{
            return(
                <div>
                    <h1>Manage Event</h1>
                    <MuiThemeProvider>                    
                        <Table
                            selectable={true}>
                            <TableHeader 
                                displaySelectAll={false}
                                adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Event</TableHeaderColumn>
                                    <TableHeaderColumn>Location</TableHeaderColumn>
                                    <TableHeaderColumn>Schedule</TableHeaderColumn>
                                    <TableHeaderColumn>Action</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                showRowHover={true}
                                stripedRows={true}>
                                {
                                    this.state.events.map((event)=>                                    
                                        <TableRow key={event.eventID} value={event}>
                                            <TableRowColumn>{event.name}</TableRowColumn>
                                            <TableRowColumn>{event.location}</TableRowColumn>
                                            <TableRowColumn>{new Date(event.from +'Z').toLocaleDateString()}</TableRowColumn>
                                            <TableRowColumn>
                                                <FlatButton
                                                    label="View"
                                                    onClick={()=>{this.openDetail(event.eventID)}}/>
                                                <FlatButton
                                                    label="Edit"/>
                                                <FlatButton
                                                    label="Delete"/>
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <Dialog
                            title="View Detail"
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.openDetail}
                            autoScrollBodyContent={true}>
                            <EventDetail eventID={this.state.selectedEventID}/>
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            );
        }
    }
}