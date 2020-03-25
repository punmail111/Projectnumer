import React,{ Component } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { Root } from '../components/Root';
import { InputGroup, InputGroupAddon, InputGroupText, Input , Row, Col, Button } from 'reactstrap';
import { compile } from 'mathjs';
import { Layout } from '../components/Layout';
import { Table } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

var dataTable = [];
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "XI",
    dataIndex: "xi",
    key: "xi"
  },
  {
    title: "Xi+1",
    dataIndex: "xi+1",
    key: "xi+1"
  },
  {
    title: "XI+2",
    dataIndex: "xi+2",
    key: "xi+2"
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error"
  }

];

class Secant extends Component{

  data(){
    axios.get('http://192.168.99.100:8080/secant').then(res => {
      this.setState({
        fx: res.data[0].fx,
        x0: res.data[0].x0,
        x1: res.data[0].x1,
        showInput: false,
      });
      this.forceUpdate();
      this.Secant(Number(this.state.x0),(this.state.x1));

    });
  }

  constructor(){
    super();
    this.state = {
      fx:'',
      x0: 0,
      x1: 0,
      showTable: false,
      showInput: true,
      showBotton:false
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.data = this.data.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      this.Secant(parseFloat(this.state.x0),parseFloat(this.state.x1));
      this.setState({
        showInput: false,

      })
    }

    Secant(x0,x1){
      var fx0,fx1,dfx,e,x;
      var i = 0;
      var data = [];
      data['x0'] = [];
      data['x1'] = [];
      data['error'] = [];
      data['x'] = [];
      do{
        data['x0'][i] = x0.toFixed(6);
        data['x1'][i] = x1.toFixed(6);
        fx0 = this.func(x0);
        fx1 = this.func(x1);
        dfx = (fx0-fx1) / (x0-x1);
        x = x0-(fx0 / dfx);
        data['x'][i] = x.toFixed(6);
        e = this.error(x1,x0);
        data['error'][i] = e.toFixed(6);
        x0 = x1;
        x1 = x;
        i++;
      }while(e>0.000001 && i<20)
      this.CreatedataTable(data['x0'],data['x1'],data['x'],data['error']);
      this.setState({
        showTable: true,
        showBotton: true
      })
    }

    CreatedataTable(x0,x1,x,e){
      for(var i=0;i<e.length;i++){
        dataTable.push({
          iteration: i,
          xi: x0[i],
          'xi+1': x1[i],
          'xi+2': x[i],
          error: e[i]
        })
      }
    }

    func(x){
      var expr = compile(this.state.fx);
      var scope = {x:parseFloat(x)};
      return expr.evaluate(scope);
    }

    error(xnew,xold){
      return Math.abs((xnew-xold)/xnew);
    }

  render(){

    return(

      <div className="Secant">
        <Layout>
        <Root/>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:'center'}}>Secant Method</h1>
        <br />
        <Col sm='20' md={{ size: 6, offset: 3 }}>


          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText >F<sub>x</sub></InputGroupText>
            </InputGroupAddon>
          <Input type='text' name='fx' placeholder='x^3-20' value={this.state.fx} onChange={this.handleChange} />
          </InputGroup>

          <br />

          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText >X<sub>0</sub></InputGroupText>
            </InputGroupAddon>
              <Input type="text" class="form-control" name='x0' placeholder='1.0' onChange={this.handleChange}/>
          </InputGroup>
          <br />

          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText >X<sub>1</sub></InputGroupText>
            </InputGroupAddon>
              <Input type="text" class="form-control" name='x1' placeholder='5.0' onChange={this.handleChange}/>
          </InputGroup>
          <br />
          <br />
          {this.state.showInput && <Button type="button" class="btn btn-primary btn-lg" onClick={this.handleSubmit}>Submit</Button>}
          {this.state.showInput && <Button type="button" class="btn btn-primary btn-lg" onClick={this.data}>Auto</Button>}
          <br />
          <br />
          <br />
          <br />
          {this.state.showTable && <Table columns={columns} dataSource={dataTable}/>}
          {this.state.showBotton && <Button href = '/Root_of_Equation/Secant' type="button" class="btn btn-primary btn-lg">Start agains</Button>}

        </Col>
        </Layout>
      </div>
      );
    }
  }


  export default Secant;
