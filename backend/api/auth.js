const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../config')
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
    let msg = errors.array()[0].msg
    if(!errors.isEmpty()){
        return res
        .status(400)
        .send(msg)
    }
    const {email,password} = req.body;

     try{
        let user = await User.findOne({email});
        if(!user){
            return res
            .status(400)
            .send("Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res
            .send(400)
            .send("Invalid Credentials")
        }
     }catch(err){
         let user = await User.findOne({email});
     }
}
)