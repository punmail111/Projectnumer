import React,{ Component } from 'react';
import { Button } from 'reactstrap';
import { Layout } from './components/Layout';

class Nomatch extends Component{

    render(){

      return(
        <div>
          <Layout>
          <h1>Wrong path</h1>
          <Button href = '/' type="button" class="btn btn-primary btn-lg">Back to home</Button>
          </Layout>
        </div>
      );
    }
}



export default Nomatch;
