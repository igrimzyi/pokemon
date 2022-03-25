import react, {Component, useState} from 'react'; 
import { Form, 
    Input,
    FormGroup, 
    Label, 
    Button,
     Alert } from 'reactstrap';
    const axios = require('axios'); 
import './register.css'


export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '', 
      password:'',
      errResponse: '',
      isOpen:false

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state)
    //post req to my backend
    axios
        .post('http://localhost:4000/api/users' ,this.state)
        .then(res =>{
          return res.data
        })
        .catch(error =>{
          //<param>.response.data is what gets the backend response and allows the data to be console logged 
        this.setState({errResponse: error.response.data})
        this.setState({isOpen:false})
   
        if(!this.state.errResponse){
          
        }else{
          this.setState({isOpen:true})
        
          
        }
          return error
        })

       
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    })
  }
  
  componentDidUpdate(err){
  

    
  }


    render(){
            return(
<div>
  <Alert className="alert-margins" color="danger" isOpen={this.state.isOpen} toggle={() =>{this.setState({isOpen:false})}}>
            {this.state.errResponse}
  </Alert>
  {/* toggle={onDismiss} */}
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
    {/* <FormGroup floating>
      <Input
        id="check-Password"
        name="check-password"
        placeholder="Password"
        type="check-password"
        value={this.state.value} 
        onChange={this.handleInputChange}
      />
      <Label for="check-Password">
        Confirm Password
      </Label>
    </FormGroup> */}
    {' '}
    <Button color='success'>
      Submit
    </Button>
  </Form >
</div>

        )


    }



}
