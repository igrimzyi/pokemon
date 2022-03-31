const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check , validationResult} = require('express-validator'); 
const Profile = require('../models/Profile');




//protected route that receives user information and sends it to my frontend 
router.get('/', authenticateToken, async(req,res)=>{
    try{
        console.log('protected route')
        const profile = await Profile.findOne({email:req.user.id})
        console.log(profile)
        const likes = profile.likes
        res.send(likes)  
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error" + err)
    }
}); 
router.patch('/', authenticateToken, async(req,res)=>{
    try{
        const profile = await Profile.findOne({email:req.user.id})
        
    }catch(err){

    }
})
//middleware in order to verify and decode token
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401).send('forbidden route')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
        if(err) return res.status(403).send('forbidden token');
        req.user = user
        
        next();
    })
}

// router.patch('/', authToken, (req,res)  =>{
//     try{

//     }catch(err){
//         res.status(500).send("Server Error" + err)
//     }
// } )

module.exports = router;