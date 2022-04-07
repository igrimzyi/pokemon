import React, {Component} from "react"
import {NavLink  } from "react-router-dom"; 
import {  Navbar, 
NavbarBrand, 
NavbarToggler, 
Collapse, 
Nav, 
NavItem, 
UncontrolledDropdown,
DropdownMenu,
DropdownItem, 
DropdownToggle,
NavbarText} from "reactstrap";
import "./navstyles.css"
const axios = require('axios');
//Usage of reactstrap for navbar styles
//create certain components within seperate folders for styling wises
export default class NavbarReact extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      isOpen: false,
      profilePicture: "", 

    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/profile',{
      headers:{
          Authorization: "Bearer " + localStorage.getItem('userToken')
      }
  })
  .then((res)=>{
    let data = res.data;
    this.setState({
      profilePicture:data.profilePicture
    })
    console.log(this.state.profilePicture)
    return this.state.profilePicture
    
  })
  .catch((err)=>{
    return err
  })

  console.log(this.state.profile)



  }


        render(){
          if(this.state.profilePicture){
            return(
            
  <Navbar
    color="dark"
    expand="md"
    dark
    fixed="top"
    >

    <NavbarBrand href="/">
      Poke Complex
    </NavbarBrand>
    <NavbarToggler onClick={() => this.setState({ isOpen: !this.state.isOpen})} />
    <Collapse isOpen={this.state.isOpen} navbar>
      <Nav
        className="me-auto"
        navbar
      >
       
        <NavItem>
          <NavLink className= {'text-decoration margins'} to="/pokedex">
            Pokedex
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={'text-decoration'} to="/game">
            Poke Game
          </NavLink>
        </NavItem>
       
      </Nav>
      
      <NavItem>
        
          <NavLink className={'text-decoration right-link' } to="/pokedex">
            <img src={this.state.profilePicture} className="profile-styles"></img>
          </NavLink>
        </NavItem>
    </Collapse>
  </Navbar>
          

            )
            }
            
      else if(!this.state.profilePicture){
              return(
              
    <Navbar
      color="dark"
      expand="md"
      dark
      fixed="top"
      >
  
      <NavbarBrand href="/">
        Poke Complex
      </NavbarBrand>
      <NavbarToggler onClick={() => this.setState({ isOpen: !this.state.isOpen})} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav
          className="me-auto"
          navbar
        >
         
          <NavItem>
            <NavLink className= {'text-decoration margins'} to="/pokedex">
              Pokedex
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={'text-decoration'} to="/game">
              Poke Game
            </NavLink>
          </NavItem>
         
        </Nav>
        
        <NavItem>
          <NavLink className={'text-decoration right-link' } to="/login">
            Login
          </NavLink>
        </NavItem>
      </Collapse>
    </Navbar>
            
  
              )
              }

        }



}

//   <NavLink to="/">Home</NavLink>
//                         <NavLink to="/pokedex">Pokedex</NavLink>
