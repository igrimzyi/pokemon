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
                        enemyPokemon:null,
                        didGameEnd:false
                }

                this.handleClickStart = this.handleClickStart.bind(this)
        }

        componentDidMount(){
                //get the random pokemon for the user
                const randomNum = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
                .then((res)=>{
                        console.log(res)
                })
                .catch((err)=>{
                        console.log(err)
                })
                //get the random pokemon for the user to fight against 
                const randomNumComputer = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumComputer}`)
                .then((res)=>{
                        console.log(res)
                })
                .catch((err)=>{
                        console.log(err)
                })
                //get user profile to insert winning or losing data to his stats 
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
        //function will handle attack from user
        handleAttack(){


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