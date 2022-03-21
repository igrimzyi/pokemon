import react, {Component} from 'react'; 
import { Form, 
    Input,
    FormGroup, 
    Label, 
    Button } from 'reactstrap';
    const axios = require('axios'); 
import './register.css'
export default class Register extends  Component {
  componentDidMount(){
    axios.post('http://localhost:4000/api/users', (req,res) =>{



    })
  }
  

    render(){
            return(
                <div>
                    <Form className='register-margins' inline>
      <h2>Register</h2>
    <FormGroup floating>
    
      <Input
        id="Email"
        name="email"
        placeholder="Email"
        type="email"
      />
      <Label for="Email">
        Email
      </Label>
    </FormGroup>
    <FormGroup floating>
    
    <Input
      id="username"
      name="username"
      placeholder="Username"
      type="username"
    />
    <Label for="username">
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
      />
      <Label for="Password">
        Password
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="check-Password"
        name="check-password"
        placeholder="Password"
        type="password"
      />
      <Label for="check-Password">
        Confirm Password
      </Label>
    </FormGroup>
    {' '}
    <Button color='success'>
      Submit
    </Button>
  </Form>





                </div>

        )


    }



}
