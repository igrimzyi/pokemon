import React, {Component} from 'react'; 
import NavbarReact from './components/navbar/Navbar';
import Home from './components/home/Home';
import Pokedex from './components/pokedex/Pokedex';
import Game from './components/game/Game';
import Register from './components/register/Register';
import Pokemon from './components/pokemon/Pokemon';
import Login from './components/login/Login';
import LikedPokemon from './components/profile/LikedPokemon';
import Profile from './components/profile/Profile';
import NotFound from './components/notfound/NotFound';
import Logout from './components/logout/Logout'

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from './components/profile/Edit';


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
            <Route path='/' exact element={<Home/>}/>
           
            <Route path='/game'  exact element={<Game/>}/>
            <Route path='/login'exact element={<Login/>}/>
            <Route path='/register'exact element={<Register/>}/>
          {/*dynamic routing in the navbar component  */}
          <Route path='/pokedex' exact element={<Pokedex />}/> 
          <Route path='/pokedex/:pokeId' exact element={<Pokemon/>}/>
          <Route path='/likes' exact element={<LikedPokemon/>}/>
          <Route path='/profile' exact element={<Profile/>}/>
          <Route path='/profile/edit' exact element={<Edit/>}/>
          <Route path= '/profile/likes' exact element={<LikedPokemon/>}/>
          <Route path='/logout'exact element={<Logout/>}/>


          <Route
            path="*"
            element={<NotFound/>}
          />

          
       
           </Routes>
       
      </Router>
     
    </div>
  );
}
 }

 export default App; 

