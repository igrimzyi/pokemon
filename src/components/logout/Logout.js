import {React, Component} from 'react';
import {Navigate} from 'react-router-dom';


export default class Logout extends Component{
    
    constructor(props){
        super(props); 
        this.state = {
            logout:null
        }
    } 

    componentDidMount(){
        localStorage.removeItem("userToken")

    }

    render(){
        return(
            <div>
                <Navigate to='/' replace={true} ></Navigate>
            </div>
        )
    }

}