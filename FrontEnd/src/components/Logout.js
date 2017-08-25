import { Component } from 'react'
export class Logout extends Component {
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.nextProps != this.props;
    }

    render(){        
        return(
            <div>
                {localStorage.removeItem('user-token')}       
                You're logged out.
            </div>
        )
    }

    componentDidMount(){
        this.props.updateOtherComponent(this);
    }
}