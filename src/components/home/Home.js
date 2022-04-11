import React, {Component} from "react";
import './home.css'
import {Button} from 'reactstrap';
import axios from 'axios';

import NavbarReact from "../navbar/Navbar";

 class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            pokeData:{}
        }
    }

    componentDidMount(){
        const baseUrl =  "https://pokeapi.co/api/v2/pokemon/25"

        axios
        .get(baseUrl)
        .then((res)=>{
            this.setState({
                pokeData: res.data.sprites.front_default
            })

            console.log(this.state.pokeData)
        })
        .catch((err)=>{
            return err
        })
    }
        render(){
            return(

                
                <section className="main">

                    <NavbarReact/>
                <div>
                    
                    <div className="main-title">
                        <h3 className="">Welcome to Poke Complex</h3>
                        <span>Check out the pokedex and the game that comes with!</span>
                        <div>
                                <Button
                                color="dark"
                                size=""
                                href="/pokedex"
                                className="button"
                                >
                                View Pokedex
                                </Button>
                        </div>
                        <img className="pokemon-display" src={this.state.pokeData}></img>
                    </div>
                    
                    
                </div>
                </section>
                )
      }

    }

export default Home;

