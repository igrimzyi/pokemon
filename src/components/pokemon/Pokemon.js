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
    Button,
    Progress,
   
    } from "reactstrap";

    export default function PokemonInformation() {
        let {pokeId} = useParams();
        console.log(pokeId)
        let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
        //functional components require you to use the useState hook in order to set state unlike class components where they
        //use this.state or this.setState method
        const [pokeData, setPokeData] = useState('');
        const [pokeExperience, setPokeExperience] = useState('');
        const [pokeType, setPokeType] = useState('');
        const [pokeHealth, setPokeHealth] = useState('');
        const [pokeAttack, setPokeAttack] = useState('');
        const [pokeDefense, setPokeDefense] = useState('');
        const [errorRender, setErrorRender] = useState('');
        const [pokeName, setPokeName] = useState('')
        
        

        //get the pokemon information and render that specific pokemon on to the page!
        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data;
                console.log(data)
                let imgURL = data.sprites.front_default;
                setPokeName(data.name)
                setPokeData(imgURL);
                setPokeExperience(data.base_experience)
                setPokeType(data.types[0].type.name);
                setPokeHealth(data.stats[0].base_stat);
                setPokeAttack(data.stats[1].base_stat);
                setPokeDefense(data.stats[2].base_stat);
                console.log(data)
            })
            .catch((err) =>{
                console.log( + err)
                setErrorRender(err);
            })

    // //returning a 404 page not found res to the user.
    //         if(errorRender !== ''){
    //             return(
    //                 <h3 className='title'>404</h3>
    //             )

    //         }
            //returning an empty card during the loading phase of the react state
            if(!pokeData){
                return(
        <div className='title'>
        <Card>
            <CardBody>
               <CardText tag='h2'>
                   Loading...
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
                    {pokeName}
                </CardTitle>
                <CardText>
                    {pokeType} 
                </CardText>
                <CardText>
                    Default exp: {pokeExperience}
                </CardText>

                {/* setting the stats of the pokemon */}
                <div className="text-center">
                    {pokeHealth} of 255
                </div>
                 <Progress
                max="255"
                value={pokeHealth}
                color='danger'
                >
                health
                </Progress>
                <div className="text-center">
                    {pokeAttack} of 255
                </div>
                <Progress
                max="255"
                value={pokeAttack}
                color='danger'
                >
                Attack
                </Progress>
                <div className="text-center">
                    {pokeDefense} of 255
                </div>
                <Progress
                max="255"
                value={pokeDefense}
                color='primary'
                >
                Defense
                </Progress>
    
             
            </CardBody>
            </Card>
            
        </div>
        )

    }