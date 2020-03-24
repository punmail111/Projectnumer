import React,{ Component } from 'react';
import Popup from "reactjs-popup";
import { NavigationBar } from '../components/NavigationBar';
import { Iter } from '../components/Iter';
import { InputGroup, InputGroupAddon, InputGroupText, Input , Row, Col, Button } from 'reactstrap';
import { compile } from 'mathjs';
import { Layout } from '../components/Layout';
import { Table } from 'antd';
import  axios  from 'axios';


var display = [];
var X=[] , Fx=[];
var dataTable = [];
var A=[],B=[];


class Newton extends Component{

  data(){
    axios.get('http://192.168.99.101:8080/newton').then(res => {
      this.setState({
        fx: res.data[0].fx,
        xl: res.data[0].xl,
        xr: res.data[0].xr,
        showInput: false,
      });
      this.forceUpdate();
      this.Newton(Number(this.state.n),Number(this.state.x));

    });
  }


  constructor(){
    super();
    this.state = {
      fx:'',
      n: 0,
      x: 0,
      showTable: false,
      showBotton: false,
      showInputx: false,
      showInputn: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNx = this.createNx.bind(this);
    this.data = this.data.bind(this);

  }





  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.Newton(parseFloat(this.state.n),parseFloat(this.state.x));

  }

  Newton(n,x){

    this.addx();
    var ans;
    var c0,c1,c2;
    if(n==2){
      c0 = Fx[0];
      c1 = (Fx[1]-Fx[0])/(X[1]-X[0]);
      ans = c0+(c1*(this.state.x - X[0]));

    }
    if(n==3){
      c0 = Fx[0];
      c1 = (Fx[1]-Fx[0])/(X[1]-X[0]);
      c2 = (((Fx[2]-Fx[1])/(X[2]-X[1]))-((Fx[1]-Fx[0])/(X[1]-X[0])))/(X[2]-X[0]);
      ans = c0+(c1*(this.state.x-X[0]))+(c2*(this.state.x-X[0])*(this.state.x-X[1]));
    }
    ans = ans.toFixed(6);
    display.push(ans);

    this.setState({
        showBotton: true,
        showInputx: false

    })


  }

  addx() {
      for(var i=0 ; i<this.state.n ; i++) {
          X.push(parseFloat(document.getElementById("x"+i).value));
          Fx.push(parseFloat(document.getElementById("fx"+i).value));
      }
  }






  createNx(n){
      for(var i=0;i<n;i++){
          A.push(<Input style={{
              width: "18%",
              height: "50%",
              backgroundColor: "#eddfdf",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold"
          }}
              id={"x" + i} key={"x" + i} placeholder={"x" + i} />)
              A.push(<br />)
          B.push(<Input style={{
              width: "18%",
              height: "50%",
              backgroundColor: "#eddfdf",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold"
          }}
              id={"fx" + i} key={"fx" + i} placeholder={"fx" + i} />)
              B.push(<br />)
      }
      this.setState({
          showInputx: true,
          showInputn: false,
      });
  }


  render(){

    return(

      <div className="Newton">
        <Layout>
        <Iter/>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:'center'}}>Newton Method</h1>
        <br />
          <Col sm='20' md={{ size: 6, offset: 3 }}>

          {this.state.showInputn &&
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText >N</InputGroupText>
            </InputGroupAddon>
          <Input type='text' class="form-control" name='n' placeholder='Only 2-3' onChange={this.handleChange} />
          <br />
          <Input type='text' class="form-control" name='x' placeholder='2.20' onChange={this.handleChange} />
          <InputGroupText >X</InputGroupText>
          </InputGroup>}
          <br />
          <br />
          {this.state.showInputn &&
          <Button  size="lg" onClick={() => this.createNx(this.state.n)}>Submit</Button>
          }
            </Col>
            </Layout>

            <div>
              <Layout>
              <Col sm='20' md={{ size: 6, offset: 3 }}>

              {this.state.showInputx && <div ><h2>x</h2><br /><Row>     {A}     </Row><h2>F<sub>x</sub></h2><br/><Row>     {B}     </Row>

              <br />
              <Button color="secondary" size="lg" onClick={this.handleSubmit}>Submit</Button></div>}
              {this.state.showBotton &&
                <Popup trigger={<button>Press Me</button>}>
                <div><h2 style={{textAlign:'center'}}>Answer is {display}</h2></div>
                </Popup>}
                <br />
                <br />
                {this.state.showBotton && <Button href = '/Iterpalation/Newton' type="button" class="btn btn-primary btn-lg">Start agains</Button>}
              </Col>
              </Layout>
            </div>

          </div>



    );
  }
}


export default Newton;
