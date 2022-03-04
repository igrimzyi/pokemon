const express = require('express');

const app = express();


app.listen(6000 , () =>{

console.log('listening on port 6000')

});

app.get('/', (req, res) => {
    res.send('hello world')
  })