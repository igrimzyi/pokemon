import React from 'react'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pokedex from './components/Pokedex';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


 export default App = () =>{
  return (
    <div className="App">
      <Router>
      <div>
           <Navbar/>
          <Routes>
            <Route path='/' element={Home}/>
            <Route path='/pokedex' element={Pokedex}/>
           </Routes>
       </div>
      </Router>
     
    </div>
  );
}




