const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); 




router.patch('/', authenticateToken, async(req,res)=>{

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
