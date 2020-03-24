import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Project</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link><Link to="/">Home</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Root_of_Equation/Bisection">Root of Equation </Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Iterpalation/Newton">Iterpalation</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Exact_Integrat/Trapezoidial_Rule">Exact Integrat</Link></Nav.Link></Nav.Item>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles >
)
