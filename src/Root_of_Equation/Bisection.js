import React,{ Component } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { Root } from '../components/Root';
import { InputGroup, InputGroupAddon, InputGroupText, Input , Row, Col, Button } from 'reactstrap';
import { compile } from 'mathjs';
import { Layout } from '../components/Layout';
import { Table } from 'antd';
import  axios  from 'axios';
import { Jumbotron } from '../components/Jumbotron';




var dataTable = [];

const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "XL",
    dataIndex: "xl",
    key: "xl"
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "xr"
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x"
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error"
  }
];

class Bisection extends Component{

  data(){
    axios.get('http://192.168.99.101:8080/bisection').then(res => {
      this.setState({
        fx: res.data[0].fx,
        xl: res.data[0].xl,
        xr: res.data[0].xr,
        showInput: false,
      });
      this.forceUpdate();
      this.Bisection(Number(this.state.xl),Number(this.state.xr));

    });
  }


  constructor(){
    super();
    this.state = {
      fx:'',
      xl: 0,
      xr: 0,
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
    this.Bisection(parseFloat(this.state.xl),parseFloat(this.state.xr));
    this.setState({
      showInput: false
    })
  }

  Bisection(xl,xr){
    var xm,xmn,fxr,fxl,fxm,e;
    var data=[];
    data['xl'] = [];
    data['xr'] = [];
    data['x'] = [];
    data['error'] = [];
    fxl = this.func(xl);
    fxr = this.func(xr);
    xm = (xl+xr)/2;
    fxm = this.func(xm);
    data['xl'][0] = xl.toFixed(6);
    data['xr'][0] = xr.toFixed(6);
    data['x'][0] = xm.toFixed(6);
    data['error'][0] = "-";
    if(fxm*fxr>0){
      xr = xm;
    }
    else{
      xl = xm;
    }

    var i = 1;
    do{
      fxl = this.func(xl);
      fxr = this.func(xr);
      xmn = (xl+xr)/2;
      fxm = this.func(xmn);
      data['xl'][i] = xl.toFixed(6);
      data['xr'][i] = xr.toFixed(6);
      data['x'][i] = xmn.toFixed(6);
      if(fxm*fxr > 0){
        xr = xmn;
      }
      else{
        xl = xmn;
      }
      e = this.Error(xmn,xm);
      data['error'][i] = e.toFixed(6);
      xm = xmn;
      i++;
    }while(e>0.000001 && i<20)

    this.CreatedataTable(data['xl'],data['xr'],data['x'],data['error']);
    this.setState({
        showTable: true,
        showBotton: true
    })


  }

  CreatedataTable(xl,xr,x,error){
    for(var i=0;i<xl.length;i++){
      dataTable.push({
        iteration: i,
        xl: xl[i],
        xr: xr[i],
        x: x[i],
        error: error[i]

      })
      console.log(dataTable);
    }
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

      <div className="Bisection">
        <Layout>
        <Root/>
  
        <br />
        <br />
        <br />
        <h1 style={{textAlign:'center'}}>Bisection Method</h1>
        <br />
          <Col sm='20' md={{ size: 6, offset: 3 }}>


              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >F<sub>x</sub></InputGroupText>
                </InputGroupAddon>
              <Input type='text' name='fx' placeholder='x^2+6' value={this.state.fx} onChange={this.handleChange} />
              </InputGroup>

              <br />

              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText >X<sub>l</sub></InputGroupText>
                </InputGroupAddon>
              <Input type="text" class="form-control" name='xl' placeholder='2.0' onChange={this.handleChange}/>

              <Input type="text" class="form-control" name='xr' placeholder='4.5' onChange={this.handleChange}/>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText >X<sub>r</sub></InputGroupText>
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
              {this.state.showBotton && <Button href = '/Root_of_Equation/Bisection' type="button" class="btn btn-primary btn-lg">Start agains</Button>}
            </Col>


      </Layout>
      </div>
    );
  }
}


export default Bisection;
