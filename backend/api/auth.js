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
        .send(msg)
    }
    const {email,password} = req.body;

     try{
        
        let checkUser = await User.findOne({email});
        if(!checkUser){
            return res
            .status(400)
            .send("Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(password, checkUser.password);
        if(!isMatch){
            return res
            .status(400)
            .send("Invalid Credentials")
        }

        const user = {name: email}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})


     }catch(err){
         let user = await User.findOne({email});
     }
}
)

module.exports = router;