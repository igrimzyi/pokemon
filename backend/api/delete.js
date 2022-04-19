require('dotenv').config()
const express = require('express')
const {check , validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

//delete user likes 
router.post('/', authenticateToken, async(req,res)=>{
    try{
        console.log(req.body); 
        await Profile.updateOne({email:req.user.email}, {$pull:{likes:req.body.pokemon}})
        return res.status(204).send('deleted like')
    }catch(err){
      return res.status(500).send(err)
    }
})


//auth middleware

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401).send('forbidden')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
        if(err) return res.status(403).send('forbidden token');
        req.user = user
        next();
    })
}

module.exports = router; 