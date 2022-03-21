const express = require('express');
const connectDB = require('./config/db')

connectDB();

const app = express();
const PORT = 4000; 



app.use(express.json({extended:false}));


app.use('/api/users', require('./api/users'))






app.listen(PORT, () =>{

console.log(`listening on port ${PORT}`)

});

