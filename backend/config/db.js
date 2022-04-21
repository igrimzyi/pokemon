const mongoose = require('mongoose');

//config database and allow export this function to my server
const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/pokeapp', {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database connected')
    }catch(err){
        console.error(err.message)
        process.exit(1)

    }
}

module.exports = connectDB; 