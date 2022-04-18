import React, {Component} from 'react'; 
import { Button, Progress } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import './profile.css'; 
const axios = require('axios');


export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state ={
            profileData: {},
            profilePicture:'', 
            isLoggedIn: {}
        };

    }

    componentDidMount(){

    let baseUrl = 'https://pokeapi.co/api/v2/'

        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
        axios.get('http://localhost:4000/api/profile', config)
            .then((res)=>{
                let data = res.data
                
                this.setState({
                    profileData: data
                })

                console.log(this.state.profileData)

            })
            .catch((err)=>{
                localStorage.removeItem("userToken")
                this.setState({
                    isLoggedIn: err.response.status
                })
            })

    }

    render(){
        if(this.state.isLoggedIn === 403){
                        
            return(
                     <Navigate to='/login' replace={true}></Navigate>
            )
    }else 
        return(
            <div className='profile-container container'>
                {/* Profile Edit Buttton and display */}
                <div className='text-lineup'>
                    <div className='main-profile-styles'>
                        <a className='text-decoration' href='/profile/edit'>
                           <div className='edit-profile' >
                                <img src={this.state.profileData.profilePicture} className="main-ProfileImage"/>
                                <p className='edit-profile-text'>Edit Profile</p>
                            </div> 
                        </a>
                        <h1 className='digi-text'>Hello, {this.state.profileData.name}!</h1>
                        <Button color='danger' href="/profile/edit" outline className='edit-profile-button'>Edit Profile</Button>
                </div>
                <div className='stat-bar'>
                    <h1 className='digi-text'>{this.state.profileData.class}</h1>
                    <Progress animated value={this.state.profileData.experience} max="90"/>
                    <Button className='level-button' block outline href="/game" color='success'> Level Up!</Button>
                </div>
                {/* Profile Buttons */}
                
                <div className='main-profile-buttons-div'>
                    <div className='view-pokemon'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"></img>
                        <Button href="/profile/likes"outline color='success'>View Likes</Button>
                    </div>

                    <div className='view-pokemon'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"></img>
                        <Button href="/logout" outline color='danger'>Logout</Button>
                    </div>
                </div>


                    <div>
                        {/* <Button>View Liked Pokemon</Button>

                        <Button>Edit Profile</Button> */}
                    </div>

                </div>
            </div>
        )
    }



}
