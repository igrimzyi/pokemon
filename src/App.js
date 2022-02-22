import React from 'react'; 
import NavbarReact from './components/navbar/Navbar';
import Home from './components/home/Home';
import Pokedex from './components/pokedex/Pokedex';
import Game from './components/Game';
import { Component } from 'react';


import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// this is my main app component and will be the heart of the poke project for now 
//contains the usage of react router and created as a component
 class App extends Component{
  render(){
    return (
     <div className="App">
      {/* Always wrap routes in router component */}
        <Router>
        <div>
           <NavbarReact/>
          <Routes>
          {/* components need to be wrapped in </> or will be considered a function and throw an error */}
            <Route path='/' exact element={<Home/>}/>
            <Route path='/pokedex' exact element={<Pokedex/>}/>
            <Route path='/game' element={<Game/>}/>
           </Routes>
       </div>
      </Router>
     
    </div>
  );
}
 }

 export default App; 

