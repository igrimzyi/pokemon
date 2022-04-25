require('dotenv').config()
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); 
const jwt = require('jsonwebtoken')

let trainer = 'Pokémon Trainer'
let leader =  'Gym Leader'
let champion = 'Pokémon Champion'



router.patch('/', authenticateToken, async(req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.user);
    
        let profile = await Profile.findOne({email:req.user.email})
        if(profile.class === trainer){
            let max = 100; 
            let randomNum =  Math.floor(Math.random() * 20 ) + 5; 
            let newLevel = profile.experience + randomNum ; 
            if(max <= newLevel){
                let newExperience = newLevel - max; 
                Profile.findOneAndUpdate({email:req.user.email},{experience:newExperience});
                Profile.findOneAndUpdate({email:req.user.email},{experience:newExperience});
            }

        }
        console.log(profile.experience)    
        res.send('you leveled up!').status(200)
    }catch(err){
        console.log(err)
    }


   
    

})




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