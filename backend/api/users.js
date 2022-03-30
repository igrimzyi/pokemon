require('dotenv').config()
const express = require('express')
const {check , validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');


// const authToken = require('../middleware/authMiddle')
// const config = require('config');


//These routes will be specifically designed to orchestrate my endpoint to create read update and delete users.


//error handling with express-validator
router.post('/', [
    check('name', 'name is required' )
    .not()
    .isEmpty(), 
    check('email', 'Enter a valid email')
    .isEmail(), 
    check('password' , 'Enter password correctly')
    .isLength({min: 6})
], 
async(req,res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        //returning specific params from the error array
        let msg = errors.array()[0].msg
        return res.status(400).send(msg)
}

const {name, email, password} = req.body;

try{
    let checkUser = await User.findOne({email}); 
    //validate if user already exist or not.
    if(checkUser){
        console.log(checkUser)
        return res
        .status(400)
        .json({errors:
        [{msg:`${checkUser} already exist`}]
        });
        
    }
    
    const user = new User({
        name, 
        email, 
        password
    });
    const profile = new Profile({
        name,
    }) 

    //salting and hashing the password 
    const salt = await bcrypt.genSalt(10); 

    user.password = await bcrypt.hash(password, salt);

    //Saving the user profile and saving the user creds to the mongo shell 
    await user.save()
    await profile.save()

    //user is now saved and token is the only thing that should be sent in order to access the user privileged tabs

    const userToken = {name: email, 
    id: user._id}
    const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).send({accessToken: accessToken})


    
    function authToken(req,res,next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token === null) return res.status(403)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,userToken) =>{
            if(err) return res.status(403)
            req.userToken = userToken
            next()
        })
    } 
    // authToken(userToken)


}catch(error){
    console.error(error.message);
    res.status(500).send('Server error');
}

});

module.exports = router; 