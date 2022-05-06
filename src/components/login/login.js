import React, {Component} from 'react'; 
import { Navigate } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button,Alert} from 'reactstrap';

const axios = require('axios');

import "./login.css"

//login component that is only show for now and does not have any backend application

export default class login extends Component {
  constructor(props){
    super(props)
    this.state ={
      email:'',
      password:'',  
      errResponse: '',
      isOpen:false, 
      isLoggedIn:false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//essentially we are handling the form submit as we are in our login page.

  handleSubmit(e){
    e.preventDefault()

    axios
      .post('http://localhost:4000/api/auth', this.state)
      .then(res =>{
        this.setState({
          isLoggedIn:true
        })
        //store token in local storage based off response
        localStorage.setItem('userToken', res.data.accessToken)
        return <Navigate to='/' replace={true}></Navigate>
      })
      .catch(error =>{
        this.setState({errResponse: error.response.data})
        this.setState({isOpen:true})
        return error
      })

  }


  handleInputChange(e){
    const target = e.target; 
    const value = target.value;
    const name = target.name; 
    this.setState({
      [name]:value
    })

  }


        render(){
        if(this.state.isLoggedIn===true || localStorage.userToken){
           return <Navigate to='/' replace={true}></Navigate>
          }else
                return(
    <div>

<Alert className="alert-margins iphone-xr-alert" color="danger" isOpen={this.state.isOpen} toggle={() =>{this.setState({isOpen:false})}}>
            {this.state.errResponse}
  </Alert>

    <Form className='form-margins' onSubmit={this.handleSubmit} inline>
      <h2>Login</h2>
    <FormGroup floating>
    
      <Input
        id="Email"
        name="email"
        placeholder="Email"
        type="email"
        onChange={this.handleInputChange}
        value={this.state.value}
      />
      <Label for="Email">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="Password"
        name="password"
        placeholder="Password"
        type="password"
        onChange={this.handleInputChange}
        value={this.state.value}
      />
      <Label for="Password">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button color='success'>
      Submit
    </Button>
{/*  Redirection to the register page  */}
   <Button
   className='text-margins'
   outline
   color='primary'
   href="/register"
   >
      Not Registered Yet?
  </Button>
  </Form>
 
  </div>



                )
            }



}