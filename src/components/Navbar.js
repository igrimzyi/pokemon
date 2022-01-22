import React, {Component} from "react"
import { BrowserRouter, NavLink, Route } from "react-router-dom"; 


export default class Navbar extends Component {
        render(){
            return(
            <BrowserRouter>
                <div>
                    <nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/pokedex">Pokedex</NavLink>

                    </nav>
                    <Route path="/" exact component={Home}/>
                    <Route path="/pokedex" exact component={Pokedex}/>
                    <Route path="/game" exact component={Game}/>
                    <Route path="/pokedex" exact component={About}/>

                </div>  

            </BrowserRouter>

            )


        }



}