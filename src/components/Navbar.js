import React, {Component} from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"; 
import Pokecard from "./Pokecard";
import Pokedex from "./Pokedex";


export default class Navbar extends Component {
        render(){
            return(
            <BrowserRouter>
                <div>
                    <nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/pokedex">Pokedex</NavLink>

                    </nav>
                    <Routes>
                    <Route path="/" exact element={Pokecard}/>
                    <Route path="/pokedex" exact element={Pokedex}/>
                    {/* <Route path="/game" exact component={Game}/>
                    <Route path="/creator" exact component={Creator}/>
                    <Route path="/pokedex" exact component={About}/> */}
                    </Routes>

                </div>  

            </BrowserRouter>

            )


        }



}