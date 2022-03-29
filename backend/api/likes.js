const Profile = require('../models/Profile');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check , validationResult} = require('express-validator'); 




router.get('/', (req,res)=>{
 
    try{
        const profile = Profile.findById(req.body._id)
        const likes = profile.likes
        res.send(likes)  
    }catch(err){
        res.status(500).send("Server Error" + err.message)
    }
})


// router.patch('/', authToken, (req,res)  =>{
//     try{

//     }catch(err){
//         res.status(500).send("Server Error" + err)
//     }
// } )

module.exports = router;