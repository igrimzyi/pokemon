const express = require('express');

const app = express();

app.get('/', (req, res) => {
  try{
    res.send('hello world')
  }catch(err){
    res.send(console.error(err))
  }
  
})

app.listen(4000, () =>{

console.log('listening on port 7000')

});

