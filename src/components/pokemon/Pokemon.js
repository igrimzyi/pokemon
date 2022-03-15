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
        //functional components require you to use the useState hook in order to set state unlike class components where they
        //use this.state or this.setState method
        const [pokeData, setPokeData] = useState('');
        const [pokeExperience, setPokeExperience] = useState()
        const [pokeType, setPokeType] = useState();
        
        

        //get the pokemon information and render that specific pokemon on to the page!
        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data
                
                let imgURL = data.sprites.front_default;
                setPokeData(imgURL);
                setPokeExperience(data.base_experience)
                setPokeType(data.types[0].type.name);
               console.log(data)
            })
            .catch((err) =>{
                console.log('err: ' + err)

            })
            
           
            
         
       //returning an empty card during the loading phase of the react state
            if(pokeData === ''){
                return(
        <div className='title'>
        <Card>
            <CardBody>
               <CardText tag='h2'>
                   Loading...
               </CardText>
                <CardTitle tag='h5' className=''>
                {pokeId}
                </CardTitle>
                <CardText>
                {pokeExperience}
                </CardText>
            </CardBody>
            </Card>
           
        </div>
            )
            }

 //only returning the pokemon name as of right now 
        return(
        <div className='title'>
        <Card>
            <CardBody>
                <CardImg 
                src={pokeData}
                top
                className="image-margins"
                width="30%"
                height="80%"
                />  
                <CardTitle tag='h5' className=''>
                {pokeId}
                </CardTitle>
                <CardText>
                {pokeType} 
                </CardText>
                <CardText>
                Default exp: {pokeExperience}
                </CardText>
                
             
            </CardBody>
            </Card>
            
        </div>
        )

    }