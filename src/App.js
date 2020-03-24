import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { home } from './home';
import { Nomatch } from './Nomatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';


class App extends Component{

    render(){

      return(
        <div>
          <Layout>
          <NavigationBar/>
          <Jumbotron/>
          </Layout>
        </div>
      );
    }
}



export default App;
