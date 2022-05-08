const mongoose = require('mongoose');
require('dotenv').config()

let apiName = process.env.POKE_API_NAME
let apiPass = process.env.POKE_API_PASS

//config database and allow export this function to my server
const connectDB = async () =>{
    try{
        await mongoose.connect(`mongodb+srv://${apiName}:${apiPass}@cluster0.89dxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database connected')
    }catch(err){
        console.error(err.message)
        process.exit(1)

    }
}

module.exports = connectDB; 