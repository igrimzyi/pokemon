import { Button } from "reactstrap";
import React,{ Component } from "react";
import './game.css'

class Game extends Component {
        constructor(props){
                super(props);

                this.state ={
                        isStarted:false
                }

                this.handleClickStart = this.handleClickStart.bind(this)
        }

        handleClickStart(){
                this.setState({
                        isStarted:true 
                })
        }

        render(){
                if(this.state.isStarted === false){
                        return (
                                <div className="button-view">
                                <Button className="center-content" onClick={this.handleClickStart}>Start Game</Button>
                                </div>
                        )
                }
            return(
                    <div className="button-view" >
                <h1 className="center-content" >hello world</h1>
                </div>
                        
                )
        }

}

export default Game;