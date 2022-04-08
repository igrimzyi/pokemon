import React, {Component} from 'react'; 
import './profile.css'; 
const axios = require('axios');


export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state ={
            profileData: {},
            profilePicture:'', 

        };

    }


    componentDidMount(){
        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
        axios.get('http://localhost:4000/api/profile', config)
            .then((res)=>{
                let data = res.data
                console.log(data)
                this.setState({
                    profileData: data
                
                })
            })
            .catch((err)=>{
                return err
            })

    }

    render(){
        return(
            <div>

                    <div className='text-lineup main-profile-styles'>
                    <img src={this.state.profileData.profilePicture} className="main-ProfileImage"/>
                        <h1>{this.state.profileData.name}</h1>
                    </div>
            </div>
        )
    }



}
