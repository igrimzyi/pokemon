import React, {Component} from 'react';
import { Card, CardBody, CardGroup } from 'reactstrap';
const axios = require('axios');


export default class LikedPokemon extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            name:'',
            likes:null,
            errResponse:null

        }
    }
   
    componentDidMount(){
        const config= {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }

        axios.get('http://localhost:4000/api/likes', config)
            .then((res)=>{
                this.setState({
                    likes: res.data.likes
                })
            })
            .catch((err)=>{
                this.setState({
                    errResponse:err
                })
            })


    }

    render(){
        return(
            <div>
                   
            </div>
        )
    }

}