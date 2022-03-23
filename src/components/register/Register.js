import react, {Component} from 'react'; 
import { Form, 
    Input,
    FormGroup, 
    Label, 
    Button } from 'reactstrap';
    const axios = require('axios'); 
import './register.css'

class Alert extends Component{
    
  
  
  
  render(){
    return(
    <div>
      <Alert
        color="primary"
      >
         return certain error
      </Alert>
    </div>
    )
    }
}



export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '', 
      password:'',
      errResponse: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
  
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state)
    //post req to my backend
    axios
        .post('http://localhost:4000/api/users' , this.state)
        .then(res =>{
          return res.data
        })
        .catch(error =>{
          //<param>.response.data is what gets the backend response and allows the data to be console logged 
        this.setState({errResponse: error.response.data})
        console.log(this.state.errResponse)
        if(!this.state.errResponse){
          alert("You signed up correctly")
        }else{
          alert(this.state.errResponse)
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

  

    render(){
            return(
<div>
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
