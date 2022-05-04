import react, {Component, useState} from 'react'; 
import { Form, 
    Input,
    FormGroup, 
    Label, 
    Button,
     Alert } from 'reactstrap';
    const axios = require('axios'); 
import './register.css'
import {Navigate} from 'react-router-dom'


export default class Register extends Component {
  constructor(props){
    super(props);
    //setting the state of my params with as well setting the state of my response... isOpen will be triggered through the error response
    this.state = {
      email: '',
      name: '', 
      password:'',
      errResponse: '',
      passwordCheck:'',
      isOpen:false,
      isRegistered: false
    };

  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit(e){
    e.preventDefault();
    if(this.state.email === '' || this.state.password === ''){
      this.setState({errResponse:"You have submitted information incorrectly"})
      this.setState({isOpen:true})
    }else if(this.state.password != this.state.passwordCheck){
      this.setState({errResponse:"Passwords don't match!"})
      this.setState({isOpen:true})
    }else{
    
    console.log(this.state)
    //post req to my backend
    axios
        .post('http://localhost:4000/api/users' ,this.state)
        .then(res =>{
          this.setState({
            isRegistered:true
          })
          localStorage.setItem('userToken', res.data.accessToken)
          return res.data
          
        })
        .catch(error =>{
          //<param>.response.data is what gets the backend response and allows the data to be console logged 
          //err response and is open will be triggered which will fire a response to the front end notifying my user
        this.setState({errResponse: error.response.data})
        this.setState({isOpen:true})
          return error
        })  

      }
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    })
  }
    render(){
      if(this.state.isRegistered === true || localStorage.userToken ){
        return <Navigate to='/' replace={true}></Navigate>
      }
            return(
<div>
  <Alert className="alert-margins iphone-xr-alert" color="danger" isOpen={this.state.isOpen} toggle={() =>{this.setState({isOpen:false})}}>
            {this.state.errResponse}
  </Alert>

  <Form className='register-margins' onSubmit={this.handleSubmit} inline>
      <h2>Register</h2>
    <FormGroup floating>
    
      <Input
        id="Email"
        name="email"
        placeholder="Email"
        type="email"
        value={this.state.value} 
        onChange={this.handleInputChange}
      />
      <Label for="Email">
        Email
      </Label>
    </FormGroup>
    <FormGroup floating>
    
    <Input
      id="username"
      name="name"
      placeholder="name"
      type="name"
      value={this.state.value}
      onChange={this.handleInputChange}
    />
    <Label for="name">
      Username
    </Label>
  </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="Password"
        name="password"
        placeholder="Password"
        type="password"
        value={this.state.value} 
        onChange={this.handleInputChange}
      />
      <Label for="Password">
        Password
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="passwordCheck"
        name="passwordCheck"
        placeholder="Password"
        type="password"
        value={this.state.value} 
        onChange={this.handleInputChange}
      />
      <Label for="passwordCheck">
        Confirm Password
      </Label>
    </FormGroup>
    {' '}
    <Button color='success'>
      Submit
    </Button>
  </Form >
</div>

        )


    }



}
