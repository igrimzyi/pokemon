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
                        isLoggedIn:{},
                        userPokemon:null,
                        enemyPokemon:null
                        
                }

                this.handleClickStart = this.handleClickStart.bind(this)
        }

        componentDidMount(){
                const randomNum = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
                .then((res)=>{
                        console.log(res)
                })
                .catch((err)=>{
                        console.log(err)
                })
                console.log(randomNum)
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
                if(this.state.isLoggedIn === 403){
                        
                        return(
                                 <Navigate to='/login' replace={true}></Navigate>
                        )
                }
              else if(this.state.isStarted === false){
                        return (
                               <div className="game-container">
                                <div className="button-view" >
                                <Button color="danger" className="center-content" onClick={this.handleClickStart}>Start Game</Button>  
                                </div>
                         </div> 
                        )
                }else {
            return(

                <div className="game-container">
                        <div className="button-view " >

                        </div>
                </div>
                        
                )
            }
        }

}

export default Game;