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
NavbarText} from "reactstrap";
import "./navstyles.css"
//Usage of reactstrap for navbar styles
//create certain components within seperate folders for styling wises
export default class NavbarReact extends Component {
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
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
       
        <NavItem >
          <NavLink to={"/pokedex"}>
          Pokedex
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to={"/game"}>
            Poke Game
          </NavLink>
        </NavItem>
        {/* <UncontrolledDropdown
          inNavbar
          nav
        >
          
          <DropdownMenu end>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </Nav>
      <NavbarText >
        Login
      </NavbarText>
    </Collapse>
  </Navbar>


            )


        }



}

//   <NavLink to="/">Home</NavLink>
//                         <NavLink to="/pokedex">Pokedex</NavLink>
