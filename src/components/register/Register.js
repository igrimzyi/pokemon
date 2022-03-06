import react, {Component} from 'react'; 
import { Form, 
    Input,
    FormGroup, 
    Label, 
    Button } from 'reactstrap';

export default class Register extends  Component {
    render(){
            return(
                <div>
                    <Form className='form-margins' inline>
      <h2>Register</h2>
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
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
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
