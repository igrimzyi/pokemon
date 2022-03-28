const Profile = require('../models/Profile');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
import {authToken} from '../middleware/authMiddle';

router.get('/', authToken, (req,res,next)=>{
    try{
        const likes = Profile.findById()
    }catch(err){

    }
})

router.patch('/', authToken, (req,res,next)  =>{

} )