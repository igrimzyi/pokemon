require('dotenv').config()
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); 
const jwt = require('jsonwebtoken')

let leader =  'Gym Leader'
let champion = 'Pokémon Champion'



router.patch('/', authenticateToken, async(req,res)=>{
    try{
        // console.log(req.body);
        console.log(req.user.email);
    
        let profile = await Profile.findOne({email:req.user.email})
        if(profile.class === 'Pokemon Trainer'){
            let max = 100; 
            let randomNum =  Math.floor(Math.random() * 20 ) + 5; 
            let newLevel = profile.experience + randomNum ; 
            if(max <= newLevel){
                let newExperience = newLevel - max; 
                await Profile.findOneAndUpdate({email:req.user.email},{experience:newExperience});
                await Profile.findOneAndUpdate({email:req.user.email},{class:champion});
                return res.json({msg:`You have leveled up to ${champion}!`, exp:newExperience}).status(200);
            }else{ 
                await Profile.findOneAndUpdate({email:req.user.email},{experience:newLevel});
                return res.json({msg:'You have gained experience', exp:newLevel}).status(200)
            }
        
        }else if (profile.class === champion){
     
      
            let newLevel = 1 ; 
            if(max <= newLevel){
                await Profile.findOneAndUpdate({email:req.user.email},{experience:newLevel});
                await Profile.findOneAndUpdate({email:req.user.email},{class:leader});
                return res.json({msg:`You have leveled up to ${leader}!`, exp:newLevel}).status(200);
            }

        }
        console.log(profile.experience)    
        
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