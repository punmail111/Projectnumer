import React,{ Component } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { Exact } from '../components/Exact';
import { InputGroup, InputGroupAddon, InputGroupText, Input , Row, Col, Button } from 'reactstrap';
import { compile } from 'mathjs';
import { Layout } from '../components/Layout';
import { Table } from 'antd';
import  axios  from 'axios';


var dataTable = [];

const columns = [

  {
    title: "H",
    dataIndex: "h",
    key: "h"
  },
  {
    title: "X0",
    dataIndex: "x0",
    key: "x0"
  },

  {
    title: "X1",
    dataIndex: "x1",
    key: "x1"
  },
  {
    title: "X2",
    dataIndex: "x2",
    key: "x2"
  },
  {
    title: "I",
    dataIndex: "i",
    key: "i"
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error"
  },
];


class Simphon extends Component{

  data(){
    axios.get('http://192.168.99.100:8080/exact').then(res => {
      this.setState({
        fx: res.data[0].fx,
        x0: res.data[0].x0,
        x2: res.data[0].x2,
        showInput: false,
      });
      this.forceUpdate();
      this.Simphon(Number(this.state.x0),Number(this.state.x2));

    });
  }


  constructor(){
    super();
    this.state = {
      fx:'',
      x0: 0,
      x1: 0,
      x2: 0,
      showTable: false,
      showBotton: false,
      showInput: true
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
    this.Simphon(parseFloat(this.state.x0),parseFloat(this.state.x2));
    this.setState({
      showInput: false
    })
  }

  Simphon(x0,x2){
    var fx0,fx1,fx2,h,error,x,x1;
    h = (x2-x0)/2;
    x1 = x0+h;
    fx0 = this.func(x0);
    fx1 = this.func(x1);
    fx2 = this.func(x2);

    x = (h/3)*(fx0+fx2+(4*fx1));
    x0 = x0.toFixed(6);
    x1 = x1.toFixed(6);
    x2 = x2.toFixed(6);
    x  = x.toFixed(6);
    h  = h.toFixed(6);

    this.CreatedataTable(x0,x1,x2,x,h);
    this.setState({
        showTable: true,
        showBotton: true
    })


  }

  CreatedataTable(x0,x1,x2,x,h){
    dataTable.push({
        h: h,
        x0: x0,
        x1: x1,
        x2: x2,
        i: x,


      })
      console.log(dataTable);
    }


  func(X){
    var expr = compile(this.state.fx);
    var scope = {x:parseFloat(X)};
    return expr.evaluate(scope);
  }

  Error(Xnew,Xold){
    return Math.abs((Xnew-Xold)/Xnew);
  }

  render(){

    return(

      <div className="Simphon">
        <Layout>
        <Exact/>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:'center'}}>Simphon Method</h1>
        <br />
          <Col sm='20' md={{ size: 6, offset: 3 }}>


              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >F<sub>x</sub></InputGroupText>
                </InputGroupAddon>
              <Input type='text' name='fx' placeholder='(x-20)^2' value={this.state.fx} onChange={this.handleChange} />
              </InputGroup>

              <br />

              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >X<sub>0</sub></InputGroupText>
                </InputGroupAddon>
              <Input type="text" class="form-control" name='x0' placeholder='5.0' onChange={this.handleChange}/>

              <Input type="text" class="form-control" name='x2' placeholder='7.0' onChange={this.handleChange}/>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText >X<sub>2</sub></InputGroupText>
              </InputGroupAddon>
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
              {this.state.showBotton && <Button href = '/Exact_Integrat/Trapezoidial_Rule' type="button" class="btn btn-primary btn-lg">Start agains</Button>}
            </Col>


      </Layout>
      </div>
    );
  }
}


export default Simphon;
