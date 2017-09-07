import { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

export class SearchEventForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <MuiThemeProvider>
                <TextField 
                    fullWidth={true}
                    hintText="Search..."/>
            </MuiThemeProvider>
        )
    }
}