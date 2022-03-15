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
//Usage of reactstrap for navbar styles
//create certain components within seperate folders for styling wises
export default class NavbarReact extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false}
  }


        render(){
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

//   <NavLink to="/">Home</NavLink>
//                         <NavLink to="/pokedex">Pokedex</NavLink>
