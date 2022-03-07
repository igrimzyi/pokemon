const express = require('express');

const app = express();

const PORT = 4000; 

app.get('/', (req, res) => {
  try{
    res.send('hello world')
  }catch(err){
    res.send(console.error(err));
  }
  
})

app.get('https://pokeapi.co/api/v2/pokemon', (req,res) =>{
  try{
    res.json();


  }catch(err){
    console.error(message.err);


  }



})

app.listen(PORT, () =>{

console.log(`listening on port ${PORT}`)

});

