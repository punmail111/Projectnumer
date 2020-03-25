import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bisection from './Root_of_Equation/Bisection';
import False_Position from './Root_of_Equation/False_Position';
import Newton_Raphson from './Root_of_Equation/Newton_Raphson';
import Onepoint from './Root_of_Equation/Onepoint';
import Secant from './Root_of_Equation/Secant';
import Trapezoidial_Rule from './Exact_Integrat/Trapezoidial_Rule';
import Composite_Trapezoda from './Exact_Integrat/Composite_Trapezoda';
import Simphon from './Exact_Integrat/Simphon';
import Composite_Simphon_Rule from './Exact_Integrat/Composite_Simphon_Rule';
import Newton from './Iterpalation/Newton';
import Langrange from './Iterpalation/Langrange';
import Nomatch from './Nomatch';
import './index.css';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/Root_of_Equation/Bisection" component={Bisection}/>
      <Route path="/Root_of_Equation/False_Position" component={False_Position}/>
      <Route path="/Root_of_Equation/Newton_Raphson" component={Newton_Raphson}/>
      <Route path="/Root_of_Equation/OnePoint" component={Onepoint}/>
      <Route path="/Root_of_Equation/Secant" component={Secant}/>
      <Route path="/Exact_Integrat/Trapezoidial_Rule" component={Trapezoidial_Rule}/>
      <Route path="/Exact_Integrat/Composite_Trapezoda" component={Composite_Trapezoda}/>
      <Route path="/Exact_Integrat/Simphon" component={Simphon}/>
      <Route path="/Exact_Integrat/Composite_Simphon_Rule" component={Composite_Simphon_Rule}/>
      <Route path="/Iterpalation/Newton" component={Newton}/>
      <Route path="/Iterpalation/Langrange" component={Langrange}/>


      <Route component={Nomatch}/>

    </Switch>
  </Router>,document.getElementById('root')


);


serviceWorker.unregister();
