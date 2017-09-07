import { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import * as CommonHelper from './Common';
//import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export class EventTile extends Component{
    constructor(props){
        super(props);
        this.state = ({
            open: false
        });
    }

    render(){
        const styles = {
            root: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            },
            gridList: {
              width: 500,
              height: 450,
              overflowY: 'auto',
            },
          };

        return(
            <GridTile
                onClick = {(e) => {
                    this.props.openDetail(this.props.eventData.eventID);
                    e.preventDefault();
                }}
                titlePosition="top"
                key={this.props.eventData}
                title={this.props.eventData.name}
                subtitle={<span><b>{this.props.eventData.from.substring(0,10)}</b></span>}>
                <img src="http://borobudurmarathon.co.id/wp-content/uploads/2017/03/20161120WEN11_resize-1024x640.jpg"/>
          </GridTile>
        );
    }

}