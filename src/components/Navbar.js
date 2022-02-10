import React, {Component} from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"; 
import {  Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, UncontrolledDropdown,DropdownToggle, DropdownMenu,DropdownItem, NavbarText} from "reactstrap";
//Usage of reactstrap for navbar styles

export default class NavbarReact extends Component {
        render(){
            return(
            
  <Navbar
    color="dark"
    expand="md"
    dark
  >
    <NavbarBrand to="/">
      Poke Complex
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>

          <NavLink to ={"/Pokedex"}>
            Pokedex
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/Game"}>
            Poke Game
          </NavLink>
        </NavItem>
        <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
          >
            Options
          </DropdownToggle>
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
        </UncontrolledDropdown>
      </Nav>
      <NavbarText>
        Simple Text
      </NavbarText>
    </Collapse>
  </Navbar>

           

            )


        }



}

//   <NavLink to="/">Home</NavLink>
//                         <NavLink to="/pokedex">Pokedex</NavLink>
