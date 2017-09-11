import { PropTypes, Component } from 'react'
import axios from 'axios';
import { EventTile } from './EventTile';
import { EventDetail } from './EventDetail';
import * as CommonHelper from './Common';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export class EventList extends Component{
    constructor(props){        
        super(props);        
        this.state = ({
            events:[],
            open: false,
            selectedEvent: ''
        });
        this.openEventDetail = this.openEventDetail.bind(this);
    }

    componentWillMount(){        
        axios.get(CommonHelper.ExploreJogjaAPIServer() + 'event/GetHomePageEventList')
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

    handleToggle = () => {
        this.setState({open: !this.state.open});
    }

    openEventDetail(eventID){
        this.setState({
            open: !this.state.open,
            selectedEvent: eventID
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.eventID === undefined || this.state.eventID != nextState.EventID;
    }

    render(){    
        const styles = {
            root: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            },
            gridList: {
              width: '80%',
              height: 'auto',
              overflowY: 'auto',
            },
          };

        return(
            <div>
                <MuiThemeProvider>
                    <div style={styles.root}>                
                        <GridList
                            cols={5}
                            cellHeight={180}
                            style={styles.gridList}>
                            {                    
                                this.state.events.map((event) => {
                                    return <EventTile 
                                                key={event.eventID} 
                                                eventData={event}
                                                openDetail={this.openEventDetail}/>
                                })
                            }
                        </GridList>
                    </div>              
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Drawer 
                        open={this.state.open}
                        docked={false}
                        width="80%"
                        onRequestChange={(open) => this.setState({open})}>
                        <EventDetail eventID={this.state.selectedEvent}/>
                    </Drawer>
                </MuiThemeProvider><MuiThemeProvider>
                    <Drawer 
                        open={this.state.open}
                        docked={false}
                        width="80%"
                        onRequestChange={(open) => this.setState({open})}>
                        <EventDetail eventID={this.state.selectedEvent}/>
                    </Drawer>
                </MuiThemeProvider>
            </div>            
        )    

    }

}