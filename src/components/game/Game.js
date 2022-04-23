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
                        chatBoxMessage:`thinking...`,
                        enemyHealth:null,
                        userHealth:null,
                        show:null
                }

                this.handleClickStart = this.handleClickStart.bind(this);
                this.showAttack = this.showAttack.bind(this);
                this.showGui = this.showGui.bind(this);
        }

        componentDidMount(){
                //get the random pokemon for the user
                const randomNum = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
                .then((res)=>{
                        this.setState({
                                userPokemon: res.data,
                                userHealth:res.data.stats[0].base_stat,
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
                                enemyPokemon:res.data,
                                enemyHealth:res.data.stats[0].base_stat
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
        showGui(){
                this.setState({
                        show:false
                })
        }
        showAttack(){
                this.setState({
                        show:"attack"
                })
        }
        
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
                        <div className="rendered-game container">
                                <div className="enemy-side">
                                        <div className="enemy-info game-text">
                                                <div>
                                                        {this.state.enemyPokemon.name }
                                                </div>
                                                <div className="text-center">
                                                        {this.state.enemyHealth} of {this.state.enemyPokemon.stats[0].base_stat}
                                                </div>
                                                <Progress
                                                max={this.state.enemyPokemon.stats[0].base_stat}
                                                value={this.state.enemyHealth} 
                                                color='danger'
                                                />
                                        </div>
                                        <div className="enemy-pokemon">
                                                <img src={this.state.enemyPokemon.sprites.front_default}></img>
                                        </div>

                                </div>
                                <div className="user-side">
                                        <div className="pokemon">
                                                <img src={this.state.userPokemon.sprites.back_default}></img>
                                         </div>
                                        <div className="user-info game-text">
                                                <div>
                                                        {this.state.userPokemon.name }
                                                </div>
                                                <div className="text-center">
                                                        {this.state.userHealth} of {this.state.userPokemon.stats[0].base_stat}
                                                </div>
                                                <Progress
                                                max={this.state.userPokemon.stats[0].base_stat}
                                                value={this.state.userHealth} 
                                                color='danger'
                                                />
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
                                        {!this.state.show  &&
                                             <div className="ui-buttons-all">
                                                        <div className="ui-button-group">
                                                                <button onClick={this.showAttack}className="ui-button red">
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
                                        }
                                        {
                                                this.state.show === 'attack' &&
                                                <div className="attack-toolbar">
                                                        <button className="go-back" onClick={this.showGui}>
                                                                Go Back!
                                                        </button>
                                                        hello 
                                                </div>

                                        }
                                               
                                   
                                </div>
                        </div>
                </div>
                        
                )
            }
        }

}

export default Game;