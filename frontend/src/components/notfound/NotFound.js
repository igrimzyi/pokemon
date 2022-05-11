import axios from 'axios';
import React, {Component} from 'react';
import './notfound.css'; 


export default class NotFound extends Component{
    constructor(props){
        super(props); 
        this.state = {
            pokeData:null
        }
    }




    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon/jigglypuff')
        .then((res)=>{
           this.setState({
               pokeData:res.data.sprites.front_default
           })
           console.log(this.state.pokeData)
        })
        .catch((err)=>{

        })
    }

    render(){
        return(
            
            <div >
                <div className='not-found-styles not-found-text'>
               <div>404</div>
                <div>Not Found</div>
                <img src={this.state.pokeData}/>
                </div>


            </div>


        )
    }


}