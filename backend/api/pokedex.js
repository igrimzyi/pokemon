const express = require('express'); 
const server = express(); 
const router = express.Router();


const imageArray = [];
const expArray = [];
const typeArray = [];

for(let i = 1; i< 10; i++){
    router.get(`https://pokeapi.co/api/v2/pokemon/${i}`, (req,res)=>{
        try{
            const data = res.data;
            expArray.push(data.base_experience)
            imageArray.push(data.sprites.front_default)
            typeArray.push(data.types[0].type.name)
            console.log(imageArray);

        }catch(error){
            console.log('***', error)
         }
        }
        
        )
        }

server.get('/pokemon', (req,res) => {
    try{
        res.send(imageArray)
    }catch(err){


    }

})

module.exports = router;