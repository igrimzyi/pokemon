
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
            profileName: 'lol',
            imageData: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    updateName(e){
        this.setState({
            profileName:e.target.value
        });
        console.log(e.target.value)
    }

   

    componentDidMount(){
        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
          axios.get('http://localhost:4000/api/profile' , config)
        .then((res)=>{
            this.setState({
                profileData: res.data,
                profileName: res.data.name,
                imageData:res.data.profilePicture
            })

        })
        .catch((err)=>{

        })
        

    }
    handleClick(e){
        this.setState({
            imageData: e.target.value
        })
        console.log(this.state.imageData)
       
    }
    
    handleSubmit(e){
        e.preventDefault()

        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
       console.log(this.state )

        axios.patch('http://localhost:4000/api/profile', this.state, config)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
        })




    }


    render(){


        return(
            <div className='container container-editor'>
                <h1 className='h1-edit-styles'>Edit Your Trainer Profile!</h1>
               <Form className='edit-form' onSubmit={this.handleSubmit}>
                   <FormGroup  >
                       <div className='edit-name-div'>
                        <h3>Edit Trainer Name!</h3>
                        <Input onChange={this.updateName.bind(this)} value={this.state.profileName}className='input'/>
                       </div>
                 </FormGroup>
                 <FormGroup>
                       <div className='edit-trainer-picture'>
                           <h3>Edit Trainer Picture!</h3>
                           <div className='images'>
                                <div className='single-image'>
                                <img src={pfp} className='profile-image'></img>
                                <Button
                                outline
                                color="primary"
                                onClick={(e)=>this.handleClick(e)}
                                type="button"
                                value={pfp}
                                 >
                                     Ash
                                 </Button>
                                 </div>
                                
                                <div className='single-image'>
                                <img src={squirtlePfp} value={squirtlePfp} className='profile-image'></img>
                                <Button
                                outline
                                color="primary"
                                onClick={(e)=>this.handleClick(e)}
                                value={squirtlePfp}
                                type="button"
                                >
                                Squirtle
                                </Button>
                                </div>

                                <div className='single-image'>
                                <img src={misty} value={misty} className='profile-image'></img>
                                <Button
                                color="primary"
                                outline
                                onClick={(e)=>this.handleClick(e)}
                                value={misty}
                                type="button"
                                >
                               misty
                                </Button>
                                </div>
                            
                            </div>
                       </div>
                       </FormGroup>

                    <Button className='submit-btn' outline color='success'>Submit</Button>
                  
               </Form>
            </div>
        )
    }

}