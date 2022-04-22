import { Button, Progress } from "reactstrap";
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
                        didGameEnd:false,
                        chatBoxMessage:`thinking...`
                }

                this.handleClickStart = this.handleClickStart.bind(this)
        }

        componentDidMount(){
                //get the random pokemon for the user
                const randomNum = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
                .then((res)=>{
                        this.setState({
                                userPokemon: res.data,
                                chatBoxMessage:`What will ${res.data.name} do!?`
                        })
                        console.log(this.state.userPokemon)
                })
                .catch((err)=>{
                        console.log(err)
                })
                //get the random pokemon for the user to fight against 
                const randomNumComputer = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumComputer}`)
                .then((res)=>{
                        this.setState({
                                enemyPokemon:res.data
                        })
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
                                <div className="button-view">
                                <Button color="danger" className="center-content" onClick={this.handleClickStart}>Start Game</Button>  
                                </div>
                         </div> 
                        )
                }else {
            return(

                <div className="game-container">
                        {/* displaying pokmon and their health */}
                        <div>
                                <div className="enemy-side">
                                        <div className="enemy-info">
                                                <div className="text-center">
                                                        1 of 5
                                                </div>
                                                <Progress
                                                max="5"
                                                value="1"
                                                />
                                        </div>
                                        <div className="enemy-pokemon">
                                                <img src={this.state.enemyPokemon.sprites.front_default}></img>
                                        </div>

                                </div>
                                <div>
                                        <div className="user-pokemon">

                                        </div>
                                        <div className="pokemon">
                                                
                                        </div>

                                </div>
                        </div>

                        <div className="center-content">
                                <div className="ui">
                                        <div className="chat-box-styles">
                                                <span className="chat-text">
                                                        {this.state.chatBoxMessage}
                                                </span>
                                        </div>
                                             <div className="ui-buttons-all">
                                                        <div className="ui-button-group">
                                                                <button  className="ui-button red">
                                                                        Fight
                                                                </button>       
                                                                <button  className="ui-button yellow">
                                                                        Bag
                                                                </button>  
                                                                </div>
                                                        <div className="ui-button-group">
                                                                <button className=" green ui-button">
                                                                        Pokemon
                                                                </button>  
                                                                <button  className=" blue ui-button">
                                                                        Run
                                                                </button>  
                                                        </div>
                                                </div>
                                               
                                               
                                   
                                </div>
                        </div>
                </div>
                        
                )
            }
        }

}

export default Game;