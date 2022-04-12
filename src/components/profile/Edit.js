import React, {Component} from 'react'; 
import Button, { Form, FormGroup, Input } from 'reactstrap';
import './profile.css';

const axios = require('axios');

export default class Edit extends Component{
    constructor(props){
        super(props); 
        this.state= {
            profileData:null
        }
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
                profileData: res.data
            })

            console.log(this.state.profileData)
        })
        .catch((err)=>{

        })
    }



    render(){


        return(
            <div className='container container-editor'>
               <Form className='edit-form'>
                   <h1 className='h1-edit-styles'>Edit Your Trainer Profile!</h1>
                   <FormGroup className='form-group-margins' >
                       <div className='edit-name-div'>
                        <h3>Edit Trainer Name!</h3>
                        <Input className='input'/>
                       </div>
                       <div className='edit-trainer-picture'>
                           <h3>Edit Trainer Picture!</h3>
                       </div>
                   </FormGroup>
               </Form>
            </div>
        )
    }

}