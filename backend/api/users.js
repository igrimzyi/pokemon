const express = require('express')
const {check , validationResult} = require('express-validator');
const router = express.Router();



//These routes will be specifically designed to orchestrate my endpoint to create read update and delete users.

router.post('/', [
    check('name', 'name is required' )
    .not()
    .isEmpty(), 
    check('email', 'Enter a valid email')
    .isEmail(), 
    


])
