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
                        //the states for below would be for the game winner
                        didGameEnd:true ,
                        didUserWin:true,
                        didEnemyWin:false,
                        //the states below are for ui 
                        chatBoxMessage:`thinking...`,
                        enemyHealth:null,
                        userHealth:null,
                        show:null,
                        selector:0,
                        //check if the pokemon was recently changed... user cant change pokemon over and over again!
                        wasChanged:false,
                        bagUsed:false,
                        isPoweredUp:false,
                        powerUpUsed:false,
                        // Game response end
                        endResponse:null,
                        endExp:null
                        
                }

                this.handleClickStart = this.handleClickStart.bind(this);
                this.showAttack = this.showAttack.bind(this);
                this.showGui = this.showGui.bind(this);
                this.incrementSelector = this.incrementSelector.bind(this);
                this.handleUserAttack = this.handleUserAttack.bind(this)
                this.handleRun = this.handleRun.bind(this);
                this.changePokemon = this.changePokemon.bind(this);
                this.handleBag = this.handleBag.bind(this);
                this.healUser = this.healUser.bind(this);
                this.powerUpUser = this.powerUpUser.bind(this);
                this.decrementSelector = this.decrementSelector.bind(this);
                this.resetGame = this.resetGame.bind(this);
        }
        //Sending stats based off user win
        // componentDidUpdate(prevProps, prevState){
               
        //         if(this.state.didGameEnd !== prevState.didGameEnd){
        //                 console.log('ended game')
        //         }
        //         if(this.state.didUserWin !== prevState.didUserWin){
        //                 console.log('user won the game')

        //                 const config = {
        //                         headers:{
        //                             Authorization: "Bearer " + localStorage.getItem('userToken')
        //                         }
        //                     }

        //                     axios.patch('http://localhost:4000/api/levels', this.state.didUserWin, config)
        //                     .then((res)=>{
        //                             console.log(res)
        //                         this.setState({
        //                                 endResponse:res.msg,
        //                                 endExp:res.exp


        //                         })
        //                     })
        //                     .catch((err)=>{
        //                         console.log(err)
        //                     })
                    



        //         }
        //         if(this.state.didEnemyWin !== prevState.didEnemyWin){
        //                 console.log('user did not win the game')
        //         }
        // }

        componentDidMount(){
                //get the random pokemon for the user
                const randomNum = Math.floor(Math.random() * 500) + 1;
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
                const randomNumComputer = Math.floor(Math.random() * 500) + 1;
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
        //setting ui to attack and showing all attack options
        showAttack(){
                this.setState({
                        show:"attack"
                })
            
        }
        //increment and decrement through the move list 
        incrementSelector(){
                if(this.state.selector === 6){
                        this.setState({
                                selector: 6
                        })
                }else 
                this.setState({
                        selector: this.state.selector +1
                })
        }

        //decrementing through the move list
        decrementSelector(){
                if(this.state.selector === 0 ){
                        this.setState({
                                selector:0
                        })
                }else
                this.setState({
                        selector: this.state.selector - 1
                })
        }


        //this is the attack portion of the game
        //user will choose their attack and then the enemy would have a random choice...
        
        handleUserAttack(){
                let grass = 'grass'
                let fire = 'fire'
                let water = 'water'

                this.setState({
                        chatBoxMessage: `${this.state.userPokemon.name} chose ${this.state.userPokemon.moves[this.state.selector].move.name} `,
                        show:'enemy-choice'
                })
                //conditionals to weaker attack... if the user is weaker then it would be a weaker attack based off pokemon type
                if(this.state.isPoweredUp){
                        let attackDamage = Math.floor(Math.random() * 20) + 5; 
                        let newHealth = this.state.enemyHealth - attackDamage;
                        if (newHealth <= 0){
                               return this.setState({
                                        didGameEnd:true,
                                        didUserWin:true ,
                                        show: 'ended'
                                })
                        }  else 
                        this.setState({
                                enemyHealth:newHealth
                        })

                }else if(this.state.userPokemon.types[0].type.name === grass && this.state.enemyPokemon.types[0].type.name === fire ||
                   this.state.userPokemon.types[0].type.name === water && this.state.enemyPokemon.types[0].type.name === grass ||
                   this.state.userPokemon.types[0].type.name === fire && this.state.enemyPokemon.types[0].type.name === water ||
                   this.state.userPokemon.base_experience <= this.state.enemyPokemon.base_experience
                        ){
                        let attackDamage = Math.floor(Math.random() * 5)
                        if(attackDamage === 0 ){
                                this.setState({
                                        chatBoxMessage: `${this.state.userPokemon.moves[this.state.selector].move.name} had no effect!`
                                })
                        }
                        let newHealth = this.state.enemyHealth - attackDamage;
                        if (newHealth <= 0){
                                return this.setState({
                                        didGameEnd:true,
                                        didUserWin:true,
                                        show:'ended'
                                })
                        }  else 
                        this.setState({
                                enemyHealth:newHealth
                        })
                        //user strong attack
                } else if(this.state.userPokemon.types[0].type.name === fire && this.state.enemyPokemon.types[0].type.name === grass ||
                        this.state.userPokemon.types[0].type.name === grass && this.state.enemyPokemon.types[0].type.name === water||
                        this.state.userPokemon.types[0].type.name === water && this.state.enemyPokemon.types[0].type.name === fire ||
                        this.state.userPokemon.base_experience > this.state.enemyPokemon.base_experience
                             ){
                             let newHealth = this.state.enemyHealth - Math.floor(Math.random() * 20) ; 

                             if (newHealth <= 0){
                               return this.setState({
                                        didGameEnd:true,
                                        didUserWin:true,
                                        show:'ended'
                                })
                        }  else 
                             this.setState({
                                     enemyHealth:newHealth
                             })
                }else{
                        let newHealth = this.state.enemyHealth - Math.floor(Math.random() * 10) - 3; 
                        if (newHealth <= 0){
                              return  this.setState({
                                        didGameEnd:true,
                                        didUserWin:true
                                })
                        }  else   
                        this.setState({
                                enemyHealth:newHealth
                                
                        }) 
                }
                //enemy's choice to now attack 
               //Now is the enemy's choice to do what they want and thats all RNG. 
                        setTimeout(() => {
                                let randomChoice = Math.floor(Math.random() * 3);
                                
                              
                                //strong attacks from the enemy 
                                if(this.state.isPoweredUp){
                                        let attackDamage = Math.floor(Math.random() * 5) + 5 ;  
                                        let newHealth = this.state.userHealth - attackDamage;
                                        if (newHealth <= 0){
                                                this.setState({
                                                        didGameEnd:true,
                                                        didEnemyWin:true,
                                                        show:'ended'
                                                })
                                        }  else 
                                        this.setState({
                                                userHealth:newHealth
                                        })

                                }else if(this.state.userPokemon.types[0].type.name === grass && this.state.enemyPokemon.types[0].type.name === fire ||
                                        this.state.userPokemon.types[0].type.name === water && this.state.enemyPokemon.types[0].type.name === grass ||
                                        this.state.userPokemon.types[0].type.name === fire && this.state.enemyPokemon.types[0].type.name === water ||
                                        this.state.userPokemon.base_experience <= this.state.enemyPokemon.base_experience
                                        ){
                                        let attackDamage = Math.floor(Math.random() * 20) + 5 ;      
                                        let newHealth = this.state.userHealth - attackDamage;
                                        if (newHealth <= 0){
                                                this.setState({
                                                        didGameEnd:true,
                                                        didEnemyWin:true,
                                                        show:'ended'
                                                })
                                        }  else 
                                        this.setState({
                                                userHealth:newHealth
                                        })
                                        //weak attacks from enemy  
                                } else if(this.state.userPokemon.types[0].type.name === fire && this.state.enemyPokemon.types[0].type.name === grass ||
                                        this.state.userPokemon.types[0].type.name === grass && this.state.enemyPokemon.types[0].type.name === water||
                                        this.state.userPokemon.types[0].type.name === water && this.state.enemyPokemon.types[0].type.name === fire ||
                                        this.state.userPokemon.base_experience > this.state.enemyPokemon.base_experience
                                                ){
                                                let newHealth = this.state.userHealth - Math.floor(Math.random() * 5); 

                                                if (newHealth <= 0){
                                                        this.setState({
                                                                didGameEnd:true,
                                                                didEnemyWin:true,
                                                                show:'ended'
                                                        })
                                                }  else 
                                                this.setState({
                                                        userHealth:newHealth
                                                })
                                }else{
                                        let newHealth = this.state.userHealth - Math.floor(Math.random() * 10); 

                                        if (newHealth <= 0){
                                                this.setState({
                                                        didGameEnd:true,
                                                        didEnemyWin:true,
                                                        show:'ended'
                                                })
                                        }  else 
                                        this.setState({
                                                userHealth:newHealth,
                                                
                                        }) 
                                }

                                this.setState({
                                        chatBoxMessage: 'enemy chose to attack',
                                        show: null
                                })
                        }, 3000);
        

               


                console.log(this.state.userPokemon.types[0].type.name)

        }
        handleRun(){
                this.setState({
                        didGameEnd:true,
                        didEnemyWin:true
                })
        }

        handleClickStart(){
                this.setState({
                        isStarted:true 
                })
        }

        changePokemon(){
                if(!this.state.wasChanged){
                const randomNum = Math.floor(Math.random() * 10) + 1;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
                .then((res)=>{
                        this.setState({
                                userPokemon: res.data,
                                userHealth:res.data.stats[0].base_stat,
                                chatBoxMessage:`Your new Pokemon is ${res.data.name}`,
                                wasChanged:true
                        })
                })
                .catch((err)=>{
                        console.log(err)
                })
        } else if(this.state.wasChanged){
                this.setState({
                        chatBoxMessage:`You can only change your pokemon once!`
                })   
        }
        }


        //Every thing in the bag ready to be used for the user
        handleBag(){
                this.setState({
                        show:'bag'
                })
        }
        healUser(){

                //will be able to heal users pokemon 
                let addHealth = Math.floor(Math.random() * 10);
                if(this.state.bagUsed === true){
                        this.setState({
                                chatBoxMessage:'You used up your heal!'
                        })  
                }else if(this.state.userHealth + addHealth >= this.state.userPokemon.stats[0].base_stat){
                        this.setState({
                                bagUsed:true,
                                userHealth: this.state.userPokemon.stats[0].base_stat
                        })
                }else 
                this.setState({
                        bagUsed:true,
                        userHealth: this.state.userHealth + addHealth
                })

        }
        powerUpUser(){
                if(!this.state.powerUpUsed){
                this.setState({
                        isPoweredUp:true,
                        chatBoxMessage:"You are powered up!"
                })
                setTimeout(()=>{
                        this.setState({
                                isPoweredUp:false,
                                chatBoxMessage:"Your power up wore off!"
                        })
                }, 15000)
        }else if (this.state.powerUpUsed === true){
                this.setState({
                        chatBoxMessage:"You have used your power up!"
                })
        }
        }
        resetGame(e){
                e.preventDefault()
                this.setState({
                        wasChanged:false,
                        bagUsed:false,
                        isPoweredUp:false,
                        powerUpUsed:false,
                        didEnemyWin:false,
                        didUserWin:false,
                        didGameEnd:false,
                        show:null
                })

                const randomNum = Math.floor(Math.random() * 100) + 1;
                const randomNumEnemy = Math.floor(Math.random() * 100) + 1;

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

                axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumEnemy}`)
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

                
                console.log('was changed back')
        }


        render(){
                if(this.state.isLoggedIn === 403){
                        
                        return(
                                 <Navigate to='/login' replace={true}></Navigate>
                        )
                }
              else if(this.state.isStarted === false){
                        return (
                        <div className="game-container align-start">
                                <Button color="danger" className="center-button" onClick={this.handleClickStart}>Start Game</Button>  
                         </div> 
                        )
                }else {
            return(
                
                <div className="game-container">
                        {/* displaying pokemon and their health */}
                        {!this.state.didGameEnd &&
                        <div className="rendered-game container">
                                <div className="enemy-side">
                                        <div className="enemy-info game-text">
                                                <div className="poke-name-level">
                                                        {this.state.enemyPokemon.name }
                                                        
                                                    <span> Lv{this.state.enemyPokemon.base_experience}</span>  
                                                </div>

                                                <Progress
                                                max={this.state.enemyPokemon.stats[0].base_stat}
                                                value={this.state.enemyHealth} 
                                                color='danger'
                                                />
                                                <div className="text-center">
                                                        {this.state.enemyHealth} / {this.state.enemyPokemon.stats[0].base_stat}
                                                </div>
                                        </div>
                                        <div className="enemy-pokemon">
                                                <img src={this.state.enemyPokemon.sprites.front_default} className ="pokemon-size"></img>
                                        </div>

                                </div>
                                <div className="user-side">
                                        <div className="pokemon">
                                                <img src={this.state.userPokemon.sprites.back_default} className ="pokemon-size"></img>
                                        </div>
                                        <div className="user-info game-text">
                                                <div className="poke-name-level">
                                                        {this.state.userPokemon.name }
                                                        <span>Lv{this.state.userPokemon.base_experience}</span>
                                                </div>
                                               
                                                <Progress
                                                max={this.state.userPokemon.stats[0].base_stat}
                                                value={this.state.userHealth} 
                                                color='danger'
                                                />
                                                 <div className="text-center">
                                                        {this.state.userHealth} / {this.state.userPokemon.stats[0].base_stat}
                                                </div>
                                        </div>
                                        

                                </div>
                        </div>
                        }   

                        {/* This is the response if the user won the game  */}
                        {this.state.didGameEnd && this.state.didUserWin &&
                                <div className="end-game-screen">
                                        <div className="end-game-box">
                                                <div>
                                                {this.state.enemyPokemon.name} is defeated!
                                                </div>
                                                        
                                                <Button color= "success" outline onClick={this.resetGame}>
                                                        Reset Game
                                                </Button>
                                        </div>
                                </div>
                  
                        }   
                        {/* if the game is finished in any way... the bottom portion will not render and rerender */}
                        {!this.state.didGameEnd &&
                        <div className="center-content">
                                <div className="ui">
                                        <div className="chat-box-styles">
                                                <span className="chat-text">
                                                        {this.state.chatBoxMessage}
                                                </span>
                                        </div>
                                        {/* This is the bottom level of my component which renders the the buttons for my user */}
                                        {!this.state.show  &&
                                             <div className="ui-buttons-all">
                                                                <button onClick={this.showAttack} className="ui-button red">
                                                                        Fight
                                                                </button>       
                                                                <button onClick={this.handleBag} className="ui-button yellow">
                                                                        Bag
                                                                </button>  
                                                              
                                                        
                                                                <button onClick={this.changePokemon} className=" green ui-button">
                                                                        Pokemon
                                                                </button>  
                                                                <button onClick={this.handleRun} className=" blue ui-button">
                                                                        Run
                                                                </button>  
                                                        
                                                </div>
                                        }
                                        {/* To ignore the ui and have the user be unable to click any further moves */}
                                        {this.state.show === 'ended' &&
                                        <div>
                                                <div>
                                                        The game has ended
                                                </div>
                                                <button onClick={this.resetGame}>
                                                Reset Game
                                                </button>
                                        </div>

                                        }
                                        {
                                                this.state.show === 'attack' &&
                                                <div className="attack-toolbar">
                                                        <button className="go-back" value="attack" onClick={this.showGui}>
                                                                Go back!
                                                        </button>

                                                        <div className="attack-modifiers">
                                                                {this.state.selector <= 0 &&
                                                                <button className="maxed" onClick={this.decrementSelector}>
                                                                previous
                                                                </button>
                                                                }
                                                                {this.state.selector > 0 &&
                                                                <button className="selector" onClick={this.decrementSelector}>
                                                                previous
                                                                </button>
                                                                }
                                                                 <div className="attack-text">{this.state.userPokemon.moves[this.state.selector].move.name}</div>       
                                                                {this.state.selector < 6 &&
                                                                        <button className="selector" onClick={this.incrementSelector}>
                                                                        next
                                                                        </button>
                                                                }    
                                                                {this.state.selector >= 6 &&
                                                                        <button className="maxed" onClick={this.incrementSelector}>
                                                                        next
                                                                        </button>
                                                                }       
                                                        </div>
                                                        <button className="attack" onClick={this.handleUserAttack}>Attack!</button>
                                                                {/* If selector hits 6... user cant go ot any more moves */}
                                                               
                                                                                                        
                                                        
                                                </div>

                                        }
                                        {
                                                this.state.show === 'bag' &&
                                                <div className="bag-selection">
                                                        <button className="go-back" value="attack" onClick={this.showGui}>
                                                                Go back!
                                                        </button>
                                                        <button className="go-back" onClick={this.healUser}>
                                                                Heal
                                                        </button>
                                                        <button className="go-back" onClick={this.powerUpUser}>
                                                                Use Power Up!
                                                        </button>

                                                </div>
                                        }
                                        {
                                                this.state.show === 'enemy-choice' &&
                                                <div>
                                                        its the enemy's turn!
                                                </div>

                                        }
                                               
                                   
                                </div>
                        </div>
                        }
                
                </div>
         
                        
                )
            }
        }

}

export default Game;