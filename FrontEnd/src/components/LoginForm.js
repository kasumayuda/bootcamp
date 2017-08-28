import { PropTypes, Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import * as CommonHelper from './Common';
import { Link } from 'react-router';

export class LoginForm extends Component{

    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.state={
            username:'',
            password: '',
            loggedIn: '',
        }
        
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        this.setState({loggedIn: CommonHelper.IsUserLoggedIn()});
    }

    submit(e){
        e.preventDefault();        
        
        var params = new URLSearchParams();
        params.append('grant_type','password');
        params.append('username',this.state.username);
        params.append('password',this.state.password);
        var headers ={ 
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        };
        axios.post(CommonHelper.ExploreJogjaAPIServer() + 'token' , params, headers)
        .then((response)=>{
            localStorage.setItem('user-token', response.data.access_token);
            this.setState({loggedIn: true});
            this.props.updateOtherComponent(this);
        })
        .catch(function(error){
            alert('sorry buddy...error');
            console.log(error);
        })
    }

    render(){

        const{ username, password } = this.props;
        if (this.state.loggedIn){
            return (<div>You're in! <Link to="/logout" activeClassName="selected">Logout</Link></div>)
        }else{
            return(
                <MuiThemeProvider>
                <form onSubmit={this.submit} className="login-form">
                    <div><h1>Login</h1></div>
                    <div className="row">                    
                        <TextField  id="username"
                                    type="text"
                                    hintText="Enter your username"
                                    floatingLabelText="Username"
                                    required
                                    onChange = {(event, value)=> this.setState({username:value})}
                                    />
                    </div>
                    <div className="row">
                        <TextField  id="password"
                                    hintText="Enter your password"
                                    floatingLabelText="Password"
                                    type="password"
                                    required
                                    onChange = {(event, value)=> this.setState({password:value})}
                                    />
                    </div>
                    <div className="row">
                        <RaisedButton label="Login" onClick={(this.submit)}/>
                    </div>
                </form>
                </MuiThemeProvider>
            )
        };
    } 
}

LoginForm.PropTypes={
    username:PropTypes.string.isRequired    
}