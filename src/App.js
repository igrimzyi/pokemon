import React from 'react'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import { Component } from 'react';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

 class App extends Component{
  render(){
    return (
     <div className="App">
      {/* Always wrap routes in router component */}
        <Router>
        <div>
           <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/pokedex' element={<Pokedex/>}/>
           </Routes>
       </div>
      </Router>
     
    </div>
  );
}
 }

 export default App; 

