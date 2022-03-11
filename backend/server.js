const express = require('express');

const app = express();
const http = require('http');
const PORT = 4000; 

const baseURL = 'https://pokeapi.co/api/v2/';

const connectDB = require('./config/db');

connectDB();

app.use(express.json());

const cors=require("cors");

const req = require('express/lib/request');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

app.use('/api/pokedex', require('./api/pokedex'))

  
app.get(`https://pokeapi.co/api/v2/pokemon/`, (req,res) =>{
  let data = req.body; 
  console.log('***', data)

  try{
      
    }catch(error){
      console.log(error)

    }
  })

app.get('/pokedex', (req, res) => {
  try{
    res.send('hello')
    
  
  }
  catch(error){
    res.send(error)
  }
  })



// for(let i = 1; i< 10; i++){
//   http.get(`http://pokeapi.co/api/v2/pokemon/${i}`, (req,res)=>{
//       try{
//           const data = res.data;
//           expArray.push(data.base_experience)
//           imageArray.push(data.sprites.front_default)
//           typeArray.push(data.types[0].type.name)
//           console.log(imageArray);

//       }catch(error){
//           console.log('***', error)
//        }
//       }
      
//       )
//       }
  
// })

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

