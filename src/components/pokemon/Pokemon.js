import axios from 'axios';
import React, {Component, useState} from 'react'; 
import { useParams } from 'react-router-dom';
import { 
    CardGroup, 
    Card, 
    CardImg, 
    CardSubtitle,
    CardText, 
    CardBody, 
    CardTitle, 
    Button
    } from "reactstrap";

    export default function PokemonInformation() {
        let {pokeId} = useParams();
        console.log(pokeId)
        let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

        const [pokeData, setPokeData] = useState('');
        
        

        //get the pokemon information and render that specific pokemon on to the page!
        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data
           
                let imgURL = data.sprites.front_default;
                setPokeData(imgURL);
               console.log(pokeData)
            })
            .catch((err) =>{
                console.log('err: ' + err)

            })
            
           
            
         
        //only returning the pokemon name as of right now 
        return(
        <div className='title'>
            <CardBody>
                <CardImg 
                src={pokeData}
                top
                className="image-margins"
                width="25%"
                height="50%"
                >

                </CardImg>
                <CardText>
                {pokeId}
                </CardText>

            </CardBody>
           
        </div>
        )

    }