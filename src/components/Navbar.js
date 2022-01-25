import React, {Component} from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"; 
import Pokecard from "./Pokecard";


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
                    <Route path="/" exact component={Pokecard}/>
                    {/* <Route path="/pokedex" exact component={Pokedex}/> */}
                    {/* <Route path="/game" exact component={Game}/>
                    <Route path="/creator" exact component={Creator}/>
                    <Route path="/pokedex" exact component={About}/> */}
                    </Routes>

                </div>  

            </BrowserRouter>

            )


        }



}