const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () =>{
   try{
       await mongoose.connect('mongodb://localhost:27017/pokeapp', {useNewUrlParser: true, useUnifiedTopology: true})
       console.log('Database connected')
   }catch(err){
       console.error(err.message)
       process.exit(1)

   }
}

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




app.listen(PORT, () =>{

console.log(`listening on port ${PORT}`)

});

