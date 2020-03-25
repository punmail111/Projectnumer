import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Newton } from '../Iterpalation/Newton';
import { Langrange } from '../Iterpalation/Langrange';

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

export const Iter = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link><Link to="/Iterpalation/Newton">Newton</Link></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link><Link to="/Iterpalation/Langrange">Langrange</Link></Nav.Link></Nav.Item>

        </Nav>
      </Navbar.Collapse>
    </Navbar>





  </Styles >


)
