import axios from 'axios';
import React, {Component} from 'react'; 
import { useParams } from 'react-router-dom';

    export default function PokemonInformation() {
        let {pokeId} = useParams();
        console.log(pokeId)
        let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

        axios.get(`${baseUrl}${pokeId}`)
            .then((res)=>{
                let data = res.data
                console.log(data)
            })
            .catch((err) =>{
                console.log('err: ' + err)

            })
            
        return(
        <div className='title'>
            
            {pokeId}
        </div>
        )

    }