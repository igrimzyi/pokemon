const express = require('express');

const app = express();

const PORT = 4000; 

app.get('/', (req, res) => {
  try{
    res.send('hello world')
  }catch(err){
    res.send(console.error(err))
  }
  
})

app.listen(PORT, () =>{

console.log(`listening on port ${PORT}`)

});

