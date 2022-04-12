
import React, {Component} from 'react'; 
import { Button, Form, FormGroup, Input,ButtonGroup } from 'reactstrap';
import  './profile.css';
import pfp from '../../images/ashPFP.jpeg'
import squirtlePfp from '../../images/SQUIRTLE.jpeg'
import misty from '../../images/misty.jpg'


const axios = require('axios');

export default class Edit extends Component{
    constructor(props){
        super(props); 
        this.state= {
            profileData:null,
            
        }
        this.state = {
            profileName: null,
            imageData: null
        }
    }

    updateName(e){
        this.setState({
            profileName:e.target.value
        });
    }

    componentDidMount(){
        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }

        console.log(pfp)
        


        axios.get('http://localhost:4000/api/profile' , config)
        .then((res)=>{
            this.setState({
                profileData: res.data,
                profileName: res.data.name
            })

            console.log(this.state.profileData)
        })
        .catch((err)=>{

        })
        
        axios.get('https://pokeapi.co/api/v2/pokemon/squirtle')
        .then((res)=>{
            this.setState({
                imageData: res.data.sprites.front_default
            })
            console.log(this.state.imageData)
        })
        .catch((err)=>{

        })
    }



    render(){


        return(
            <div className='container container-editor'>
                <h1 className='h1-edit-styles'>Edit Your Trainer Profile!</h1>
               <Form className='edit-form'>
                   <FormGroup className='form-group-margins' >
                       <div className='edit-name-div'>
                        <h3>Edit Trainer Name!</h3>
                        <Input value={this.state.profileName} onChange={this.updateName.bind(this)} className='input'/>
                       </div>
                       <div className='edit-trainer-picture'>
                           <h3>Edit Trainer Picture!</h3>
                           <div className='images'>
                            <ButtonGroup>
                                <Button
                                outline
                                color="primary"
                                onClick={function noRefCheck(){}}
                                >
                                    <img src={pfp} className='profile-image'></img>
                                </Button>
                                <Button
                                outline
                                color="primary"
                                onClick={function noRefCheck(){}}
                                >
                                <img src={squirtlePfp} className='profile-image'></img>
                                </Button>
                                <Button
                                color="primary"
                                outline
                                onClick={function noRefCheck(){}}
                                >
                                <img src={misty} className='profile-image'></img>
                                </Button>
                            </ButtonGroup>
                            </div>
                       </div>
                    <Button className='submit-btn' outline color='success'>Submit</Button>
                   </FormGroup>
               </Form>
            </div>
        )
    }

}