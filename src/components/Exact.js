import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Trapezoidial_Rule } from '../Exact_Integrat/Trapezoidial_Rule';
import { Composite_Trapezoda } from '../Exact_Integrat/Composite_Trapezoda';
import { Simphon } from '../Exact_Integrat/Simphon';
import { Composite_Simphon_Rule } from '../Exact_Integrat/Composite_Simphon_Rule';
const Styles = styled.div`
  .navbar {
    background-color: #6bccf9;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #222;
    &:hover {
      color: white;
    }
  }
`;

export const Exact = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link><Link to="/Exact_Integrat/Trapezoidial_Rule">Trapezoidial</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Exact_Integrat/Composite_Trapezoda">Composite Trapezoda</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Exact_Integrat/Simphon">Simphon</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Exact_Integrat/Composite_Simphon_Rule">Composite Simphon</Link></Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>





  </Styles >


)
