const mongoose = require('mongoose'); 


const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
        },
    name:{
        type:String,
        required:true,
        unique:true
        },
    profilePicture: {
        type:String, 
        default: 'https://i.stack.imgur.com/l60Hf.png',
        required:true  
    }, 
    likes:{
        type:Array
    },
    experience:{
        type:Number, 
        default: 0
    }, 
    class:{
        type:String,
        default:"Pokemon Trainer",
        required:true
    },
    email:{
        type:String, 
        required:true
    }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema);