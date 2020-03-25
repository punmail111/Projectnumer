import React from 'react'
import { Button } from 'react-bootstrap';
import { Layout } from './components/Layout';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nomatch } from './Nomatch';
import { Bisection } from './Root_of_Equation/Bisection';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';


export const home = () => (
  <div>
    <NavigationBar/>
    <Jumbotron/>
    
  </div>

)
