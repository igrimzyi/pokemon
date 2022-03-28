const mongoose = require('mongoose'); 


const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
        },
    profilePicture: {
        type:String, 
        required:false,
        default: 'https://i.stack.imgur.com/l60Hf.png'
    }, 
    likes:[{
        pokemon:{
            type:String,
        }

    }]
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema);