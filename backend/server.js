const express = require('express');

const app = express();

const PORT = 4000; 

const baseURL = 'https://pokeapi.co/api/v2/';

const connectDB = require('./config/db');

connectDB();

app.use(express.json());

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 



app.get('/pokedex', (req, res) => {
  try{
    res.json({name : 'hello'});
  }catch(err){
    res.send(console.error(err));
  }
  
})

app.get('/name', (req,res) =>{
  try{
    res.json({name : 'hello'});


  }catch(err){
    console.error(message.err);


  }



})

app.listen(PORT, () =>{

console.log(`listening on port ${PORT}`)

});

