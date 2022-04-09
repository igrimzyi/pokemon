import { Button } from "reactstrap";
import React,{ Component } from "react";
import axios from 'axios';
import Login from '../login/Login'; 

import {Navigate,Route, Routes} from 'react-router-dom'

import './game.css'


class Game extends Component {
        constructor(props){
                super(props);

                this.state ={
                        isStarted:false,
                        profile:{}, 
                        isLoggedIn:{}
                        
                }

                this.handleClickStart = this.handleClickStart.bind(this)
        }

        componentDidMount(){
                const config = {
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem('userToken')
                        }
                    }

                axios.get('http://localhost:4000/api/profile', config)
                .then((res)=>{
                        this.setState({
                                profile: res
                        })
                })
                .catch((err)=>{
                        localStorage.removeItem("userToken")
                       this.setState({
                               isLoggedIn:err.response.status
                       })
                 
                      
                })
        }

        handleClickStart(){
                this.setState({
                        isStarted:true 
                })
        }

        render(){
                if(this.state.isLoggedIn){
                        
                        return(
                                 <Navigate to='/login' replace={true}></Navigate>
                        )
                }

               if(this.state.isStarted === false){
                        return (
                                <div className="button-view">
                                <Button className="center-content" onClick={this.handleClickStart}>Start Game</Button>
                                </div>
                        )
                }else  {
            return(
                    <div className="button-view" >
                <h1 className="center-content" >hello world</h1>
                </div>
                        
                )
            }
        }

}

export default Game;