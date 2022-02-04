import React from 'react'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pokedex from './components/Pokedex';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
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

export default App;



