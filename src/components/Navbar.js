import React, {Component} from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"; 

import Pokedex from "./Pokedex";


export default class Navbar extends Component {
        render(){
            return(

                <div>
                    <nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/pokedex">Pokedex</NavLink>

                    </nav>
                    

                </div>  

            

            )


        }



}