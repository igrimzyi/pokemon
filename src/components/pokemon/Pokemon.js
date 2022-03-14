import axios from 'axios';
import React, {Component} from 'react'; 
import { useParams } from 'react-router-dom';
import { CardGroup, 
    Card, 
    CardImg, 
    CardSubtitle,
    CardText, 
    CardBody, 
    CardTitle, 
    Button} from "reactstrap";

    export default function PokemonInformation() {
        let {pokeId} = useParams();
        console.log(pokeId)
        let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
        

        //get the pokemon information and render that specific pokemon on to the page!
        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data
                let pokeUrl = data.sprites.front_default;
                console.log(data)
            })
            .catch((err) =>{
                console.log('err: ' + err)

            })
            console.log()
            
         
        //only returning the pokemon name as of right now 
        return(
        <div className='title'>
            <CardBody>
                <CardImg 
                src={function imageUrl(){
                    return 'hello'
                }}
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