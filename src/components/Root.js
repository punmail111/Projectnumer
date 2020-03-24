import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bisection from '../Root_of_Equation/Bisection';
import False_Position from '../Root_of_Equation/False_Position';
import Newton_Raphson from '../Root_of_Equation/Newton_Raphson';
import Onepoint from '../Root_of_Equation/Onepoint';
import Secant from '../Root_of_Equation/Secant';

import { home } from '../home';
const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

export const Root = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link><Link to="/Root_of_Equation/Bisection">Bisection</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Root_of_Equation/False_Position">False_Position</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Root_of_Equation/Newton_Raphson">Newton_Raphson</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Root_of_Equation/OnePoint">Onepoint</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Root_of_Equation/Secant">Secant</Link></Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>





  </Styles >


)
