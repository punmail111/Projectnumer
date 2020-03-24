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
    title: "N",
    dataIndex: "n",
    key: "n"
  },
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
    title: "XN",
    dataIndex: "xn",
    key: "xn"
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


class Composite_Trapezoda extends Component{

  /*data(){
    axios.get('http://localhost:4000/Composite_Trapezoda').then(res => {
      this.setState({
        fx: res.data[0].fx,
        xl: res.data[0].xl,
        xr: res.data[0].xr,
        showInput: false,
      });
      this.forceUpdate();
      this.Composite_Trapezoda(Number(this.state.xl),Number(this.state.xr));

    });
  }*/


  constructor(){
    super();
    this.state = {
      fx:'',
      x0: 0,
      xn: 0,
      n: 0,
      showTable: false,
      showBotton: false,
      showInput: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.data = this.data.bind(this);

  }





  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.Composite_Trapezoda(parseFloat(this.state.x0),parseFloat(this.state.xn),parseFloat(this.state.n));
    this.setState({
      showInput: false
    })
  }

  Composite_Trapezoda(x0,x1,n){
    var fx0,fx1,h,error,x,fxall1=0,fxall2=0;
    h = (x1-x0)/(2*n);
    fx0=this.func(x0);
    fx1=this.func(x1);
    var xall=[];
    xall[0] = x0;

    for(var i=1;i<n;i++){
      xall[i] = xall[i-1]+h;
    }
    for(var i=1;i<n-1;i+=2){
      fxall1 += xall[i];
    }
    fxall1 *= 4;
    for(var i=2;i<n-2;i+=2){
      fxall2 += xall[i];
    }
    fxall2 *= 2;

    x = (h/3)*(fx0+fx1+fxall1+fxall2);
    fx0 = fx0.toFixed(6);
    fx1 = fx1.toFixed(6);
    x0 = x0.toFixed(6);
    x1 = x1.toFixed(6);
    h  = h.toFixed(6);
    x  = x.toFixed(6);


    this.CreatedataTable(x0,x1,x,h,n);
    this.setState({
        showTable: true,
        showBotton: true
    })


  }

  CreatedataTable(x0,x1,x,h,n){
    dataTable.push({
        h: h,
        x0: x0,
        xn: x1,
        i: x,
        n: n,

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

      <div className="Composite_Trapezoda">
        <Layout>
        <Exact/>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:'center'}}>Composite Simphon Method</h1>
        <br />
          <Col sm='20' md={{ size: 6, offset: 3 }}>


              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >F<sub>x</sub></InputGroupText>
                </InputGroupAddon>
              <Input type='text' name='fx' placeholder='x^7-16' value={this.state.fx} onChange={this.handleChange} />
              </InputGroup>

              <br />

              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >N</InputGroupText>
                </InputGroupAddon>
              <Input type='text' class="form-control" name='n' placeholder='5.0' onChange={this.handleChange} />
              </InputGroup>

              <br />

              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >X<sub>0</sub></InputGroupText>
                </InputGroupAddon>
              <Input type="text" class="form-control" name='x0' placeholder='2.5' onChange={this.handleChange}/>

              <Input type="text" class="form-control" name='xn' placeholder='9.0' onChange={this.handleChange}/>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText >X<sub>n</sub></InputGroupText>
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
              {this.state.showBotton && <Button href = '/Exact_Integrat/Composite_Trapezoda' type="button" class="btn btn-primary btn-lg">Start agains</Button>}
            </Col>


      </Layout>
      </div>
    );
  }
}


export default Composite_Trapezoda;
