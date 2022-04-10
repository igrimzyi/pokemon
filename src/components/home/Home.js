import React, {Component} from "react";
import './home.css'
import {Button} from 'reactstrap';

import NavbarReact from "../navbar/Navbar";

 class Home extends Component{
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
                    </div>
                    
                    
                </div>
                </section>
                )
      }

    }

export default Home;

