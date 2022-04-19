require('dotenv').config()
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check , validationResult} = require('express-validator'); 
const Profile = require('../models/Profile');
const User = require('../models/User')

router.get('/', authenticateToken, async(req,res)=>{
    try{
        console.log(req.user)
        //gain information by username 
        const profile = await Profile.findOne({email:req.user.email});
        console.log(profile)

        //send profile with status of 200 
        res.status(200).send(profile);
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.patch('/', authenticateToken, async(req,res)=>{
    try{
        let checkUsername = await Profile.findOne({name:req.body.profileData.name})

        if(checkUsername){
            return res.status(400).send("That name has been taken by someone!")
        }

        await User.findOneAndUpdate({name:req.body.profileData.name}, {name:req.body.profileName})
        await Profile.findOneAndUpdate({name:req.body.profileData.name}, {name:req.body.profileName})
        await Profile.findOneAndUpdate({name:req.body.profileData.name}, {profilePicture:req.body.imageData})
        res.status(200).send('Profile Has Been Updated')
    }catch(err){
       
        if(err.codeName === "DuplicateKey"){
            res.status(400).send('That name has been taken by someone!')
        }else 

        res.status(400).send('Looks like something went wrong')
    }
})




//middleware in order to verify and decode token
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