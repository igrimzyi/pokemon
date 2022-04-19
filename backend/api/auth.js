require('dotenv').config()

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

router.get('/', async(req,res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.post('/', [
    check('email' , 'Enter a valid email')
    .isEmail(),
    check('password', 'Password is Required')
    .exists()
],
async(req,res) =>{
    const errors = validationResult(req);
    // console.log(errors.array[0])
    //  let msg = errors.array()[0].msg
    if(!errors.isEmpty()){
        return res
        .status(400)
        .send(errors.array()[0].msg)
    }
    const {email,password} = req.body
     try{
        let checkUser = await User.findOne({email});
        console.log(checkUser);
        //finding if the user even exists and if not return and invalid credential message
        if(!checkUser){
            return res
            .status(400)
            .send("Invalid Credentials");
        }

        // comparing the match to the users passwords.
        const isMatch = await bcrypt.compare(password, checkUser.password);
        if(!isMatch){
            return res
            .status(400)
            .send("Invalid Credentials")
        }

        //storing data thats only unique to that user 
        const userToken = {
            email: email, 
            id: checkUser._id
        }

        const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.json({accessToken: accessToken}).status(200)


     }catch(err){
         let user = await User.findOne({email});
         if(user){
             return "user already exists"
         }
     }
}
)

module.exports = router;