require('dotenv').config()
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check , validationResult} = require('express-validator'); 
const Profile = require('../models/Profile');

//protected route that receives user information and sends it to my frontend 
router.get('/', async(req,res)=>{
    try{
        console.log('protected route')
        const profile = await Profile.findOne({email:req.user.id})
        const likes = profile.likes
        res.send(likes)  
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error" + err)
    }
}); 

//patch route for likes to be stored into mongodb
router.post('/', authenticateToken, async(req,res)=>{
    try{    
        console.log(req.body)
        const profile = await Profile.findOne({email:req.user.id})
        await Profile.updateOne({email:req.user.name},{$push:{likes:req.body.pokemon}})
        return res.status(201).send("created page")
    }catch(err){
        return err
    }
})
//delete route to delete any 
router.delete('/', authenticateToken, async(req,res)=>{
    try{
        console.log(req.body); 
        await Profile.updateOne({email:req.user.name}, {$pull:{likes:req.body.pokemon}})
        return res.status(204).send('deleted like')
    }catch(err){
        return err
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