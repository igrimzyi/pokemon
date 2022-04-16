
import React, {Component} from 'react'; 
import { Button, Form, FormGroup, Input,ButtonGroup, Alert } from 'reactstrap';
import  './profile.css';
import pfp from '../../images/ashPFP.jpeg'
import squirtlePfp from '../../images/SQUIRTLE.jpeg'
import misty from '../../images/misty.jpg'

    const axios = require('axios');

export default class Edit extends Component{
    constructor(props){
        super(props); 
        this.state = {
            profileData:null,
            profileName: null,
            imageData: null,
            isOpen:false,
            resMessage:null, 
            errResponse:null
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
            console.log(err.response)
        })
        

    }
    handleClick(e){
        this.setState({
            imageData: e.target.value
        })

       
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
            this.setState({
                isOpen:true,
                resMessage: res.data
            })
        })
        .catch((err)=>{
        })




    }


    render(){


        return(
            <div className='container container-editor'>

                <Alert className='edit-alert-styles' isOpen={this.state.isOpen} toggle={() =>{this.setState({isOpen:false})}}>
                 {this.state.resMessage}   
                </Alert>
                <h1 className='h1-edit-styles iphone-edit-styles-title'>Edit Your Trainer Profile!</h1>
                <div className='iphone-edit-name'>
                        <h3>Edit Trainer Name!</h3>
                        <Input onChange={this.updateName.bind(this)} value={this.state.profileName}className='input'/>
                </div>
               <Form className='edit-form iphone-edit-styles ' onSubmit={this.handleSubmit}>
                   
                       <div className='edit-name-div'>
                        <h3>Edit Trainer Name!</h3>
                        <Input onChange={this.updateName.bind(this)} value={this.state.profileName}className='input'/>
                       </div>
                 
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