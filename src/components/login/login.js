import React, {Component} from 'react'; 
import { NavLink } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, FormText} from 'reactstrap';
import "./login.css"

//login component that is only show for now and does not have any backend application

export default class login extends Component {
        render(){
                return(

    <div>
      
    <Form className='form-margins' inline>
      <h2>Login</h2>
    <FormGroup floating>
    
      <Input
        id="Email"
        name="email"
        placeholder="Email/Username"
        type="email"
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button color='success'>
      Submit
    </Button>
    <FormText 
    
    className='text-margins'>
      Not registered yet?
      </FormText>
  </Form>
  </div>



                )
            }



}