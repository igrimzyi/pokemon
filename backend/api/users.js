const express = require('express')
const {check , validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User');



//These routes will be specifically designed to orchestrate my endpoint to create read update and delete users.


//error handling with express-validator
router.post('/', [
    check('name', 'name is required' )
    .not()
    .isEmpty(), 
    check('email', 'Enter a valid email')
    .isEmail(), 
    check('password' , 'Enter password correctly ')
    .isLength({min: 6})
], 
async(req,res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        //returning specific params from the error array
        let msg = errors.array()[0].msg
        console.log(msg)
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

    //salting and hashing the password 
    const salt = await bcrypt.genSalt(10); 

    user.password = await bcrypt.hash(password, salt);

    await user.save()

    res.send(user)


}catch(error){
    console.error(error.message);
    res.status(500).send('Server error');
}

});

module.exports = router; 