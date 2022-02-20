import React, {Component} from "react";
import './home.css'
import {Button} from 'reactstrap'

 class Home extends Component{
        render(){
            return(
                <section className="main">
                <div className="main">
                    
                    <div className="title">
                        <h3 className="mb-auto">Welcome to Poke Complex</h3>
                        <span>Check out the pokedex and the game that comes with!</span>
                        <div>
                    <Button
                    color="dark"
                    size=""
                    href="/pokedex"
                    >
                    View Pokedex
                    </Button>
                    </div>
                    </div>
                    
                    
                </div>
                </section>
                )
      }

    }

export default Home;

