import React, {Component} from 'react'; 
import NavbarReact from './components/navbar/Navbar';
import Home from './components/home/Home';
import Pokedex from './components/pokedex/Pokedex';
import Game from './components/Game';
import Register from './components/register/Register';
import Pokemon from './components/pokemon/Pokemon';
import Login from './components/login/Login';
import LikedPokemon from './components/likedPokemon/LikedPokemon';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// this is my main app component and will be the heart of the poke project for now 
//contains the usage of react router and created as a component
 class App extends Component{
  render(){
    return (
     <div>
       
        <Router>
        
           <NavbarReact/>
          
          <Routes>
          {/* components need to be wrapped in </> or will be considered a function and throw an error */}
            <Route path='/' element={<Home/>}/>
           
            <Route path='/game' element={<Game/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          {/*dynamic routing in the navbar component  */}
          <Route path='/pokedex' element={<Pokedex />}/> 
          <Route path='/pokedex/:pokeId' element={<Pokemon/>}/>
          <Route path='/likes' element={<LikedPokemon/>}/>
          
       
           </Routes>
       
      </Router>
     
    </div>
  );
}
 }

 export default App; 

