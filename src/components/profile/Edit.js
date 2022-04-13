
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
        this.handleClick = this.handleClick.bind(this)
    }

    updateName(pfp){
        this.setState({
            profileName:pfp
        });
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
                profileName: res.data.name
            })

        })
        .catch((err)=>{

        })
        

    }
    handleClick(e){
        console.log(e.target.value)
       
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
                                <div className='single-image'>
                                <img src={pfp} className='profile-image'></img>
                                <Button
                                outline
                                color="primary"
                                onClick={(e)=>this.handleClick(e)}
                                type="button"
                                value={pfp}
                                 >
                                     ASH
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
                    <Button className='submit-btn' outline color='success'>Submit</Button>
                   </FormGroup>
               </Form>
            </div>
        )
    }

}