const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db')

connectDB();

const app = express();
const PORT = 4000; 



app.use(express.json({extended:false}));

const cors=require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

app.use('/api/users', require('./api/users'))
app.use('/api/auth', require('./api/auth'))
app.use('/api/likes', require('./api/likes'))
app.use('/api/delete', require('./api/delete'))
app.use('/api/profile', require('./api/profile'))
app.use('/api/levels', require('./api/levels'))




app.listen(PORT, () =>{

console.log(`listening on port ${PORT}`)

});

