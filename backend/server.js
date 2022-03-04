const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(6000 , () =>{

console.log('listening on port 6000')

});

