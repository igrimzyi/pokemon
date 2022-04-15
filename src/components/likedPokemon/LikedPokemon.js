import React, {Component} from 'react';
import { Card, CardBody, CardGroup } from 'reactstrap';
const axios = require('axios');


export default class LikedPokemon extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            name:'',
            likes:null

        }
    }
   
    componentDidMount(){
        const config= {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }

        axios.get('http://localhost:4000/api/likes', config, (req,res)=>{
            try{
                this.setState({
                    likes:res
                })
               return console.log(response)
            }catch(err){
                console.log(err)
            }
        })
    }

    render(){
        return(
            <div>
                    This is the likes div
            </div>
        )
    }

}