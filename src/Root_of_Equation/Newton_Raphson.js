import React,{ Component } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { Root } from '../components/Root';
import { InputGroup, InputGroupAddon, InputGroupText, Input , Row, Col, Button } from 'reactstrap';
import { compile,derivative } from 'mathjs';
import { Layout } from '../components/Layout';
import { Table } from 'antd';
import  axios  from 'axios';




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
    title: "XI+1",
    dataIndex: "xi+1",
    key: "xi+1"
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error"
  }
];

class Newton_Raphson extends Component{

  data(){
    axios.get('http://localhost:4000/newton').then(res => {
      this.setState({
        fx: res.data[0].fx,
        x0: res.data[0].x0,
        showInput: false,
      });
      this.forceUpdate();
      this.Newton_Raphson(Number(this.state.x0));

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
      this.Newton_Raphson(parseFloat(this.state.x0));
      this.setState({
        showInput: false,
        showBotton: true
      })
    }


  Newton_Raphson(x0){
    var x1,fx,dfx,e;
    var i=0;
    var data = [];
    data['x0'] = [];
    data['x1'] = [];
    data['error'] = [];
    do{
      fx = this.func(x0);
      dfx = this.diffunc(x0);
      x1 = x0-(fx/dfx);
      data['x0'][i] = x0.toFixed(6);
      data['x1'][i] = x1.toFixed(6);
      e = this.error(x1,x0);
      data['error'][i] = e.toFixed(6);
      x0=x1;
      i++;
    }while(e>0.000001 && i<20)
    this.CreatedataTable(data['x0'],data['x1'],data['error']);
    this.setState({
      showTable: true
    })

  }

  CreatedataTable(x0,x1,error){
    for(var i=0;i<error.length;i++){
      dataTable.push({
        iteration: i,
        xi: x0[i],
        'xi+1': x1[i],
        error: error[i]
      })
    }
    console.log(dataTable);
  }

  error(xnew,xold){
    return Math.abs((xnew-xold)/xnew);
  }

  func(X){
    var expr = compile(this.state.fx);
    var scope = {x:parseFloat(X)};
    return expr.evaluate(scope);
  }

  diffunc(x){
    var expr = derivative(this.state.fx,'x');
    var scope = {x: parseFloat(x)};
    return expr.evaluate(scope);
  }

  render(){

    return(

      <div className="Newton_Raphson">
        <Layout>
        <Root/>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:'center'}}>Newton_Raphson Method</h1>
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
          <br />
          {this.state.showInput && <Button type="button" class="btn btn-primary btn-lg" onClick={this.handleSubmit}>Submit</Button>}
          {this.state.showInput && <Button type="button" class="btn btn-primary btn-lg" onClick={this.data}>Auto</Button>}
          <br />
          <br />
          <br />
          <br />
          {this.state.showTable && <Table columns={columns} dataSource={dataTable}/>}
          {this.state.showBotton && <Button href = '/Root_of_Equation/Newton_Raphson' type="button" class="btn btn-primary btn-lg">Start agains</Button>}

        </Col>
        </Layout>
      </div>
      );
    }
  }


  export default Newton_Raphson;
