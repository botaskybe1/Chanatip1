import React, { useState,Component,useEffect} from 'react'
import {Card, Input, Button, Table,Row,Col, Layout,Select} from 'antd';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
import { LineChart, Line,Tooltip,XAxis,YAxis,CartesianGrid,Legend} from 'recharts';
import axios from 'axios';


const { Option } = Select;
const InputStyle = {
    background: "#f58216",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px",
    
};

       
var dataInTable = []
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
      key: "error",
      dataIndex: "error"
    }
  ];

var fx = " ";

class Bisection extends Component {
    
    constructor() {
        
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            number: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
        
    }
    bisection(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xm = 0;
        var sum= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }

        do{ 
            xm = (xl + xr) / 2;
            if (this.func(xm)*this.func(xr) < 0) { 
                sum = this.error(xm,xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }
                
            } 
            else {
                sum = this.error(xm,xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                } 
            }                
            data['xl'][n]  =   xl;
            data['xr'][n]  =   xr;
            data['x'][n]   =   xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;  
        }while(Math.abs(sum)>0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })

    
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    error(xnew, xold) {
        return Math.abs((xnew-xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i=0 ; i<xl.length ; i++) {
            dataInTable.push({
                iteration: i+1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }
    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    API = async(number)=>{
            
        var response = await axios.get('http://localhost:3001/api/users/showbisectionmodel').then(res => {return res.data});
        this.setState({
            fx:response['data'][number]['fx'],
            xl:response['data'][number]['xl'],
            xr:response['data'][number]['xr'],
        })
        this.bisection(this.state.xl,this.state.xr);
    }

    render() {
        return(
            <div style={{ padding: "30px"}}>
            <h2 style={{color: "black", fontWeight: "bold", fontSize:"100"}}>Bisection</h2>
                <div style={{float:"left"}}> 
                <Card
                    
                    title={"INPUT BISECTION"}
                    bordered={true}
                    style={{width: 1000, background: "#DEB887", color: "#FFFFFFFF", float:"left"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                        <Col span={8}>
                        <h2>f(x)</h2><Input size="large" name="fx" placeholder="input fx"style={InputStyle}></Input>
                        <h2>X<sub>L</sub></h2><Input size="large" name="xl" placeholder="input xl" style={InputStyle}></Input>
                        <h2>X<sub>R</sub></h2><Input size="large" name="xr" placeholder="input xr"style={InputStyle}></Input>
                        </Col>
                        <br/><br/> <br/><br/> <br/><br/> 
                        <br/><br/> <br/><br/> <br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit</Button>

                        <br></br><br></br><br></br> <br></br>
                        
                        <Col span={12}>
                        <Card
                            title={"DATABASE"}
                            bordered={true}
                            style={{ width: 500, background: "#DEB887"}}
                            onChange={this.handleChange}
                            
                        >
                            <div>
                                <h2>Input Number</h2><Input size="large" name="number"style={InputStyle} ></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#8B0000", color: "white" }}
                                onClick={() =>
                                    this.API(
                                        parseFloat(this.state.number)
                                    )
                                }
                            >
                                Submit
                        </Button>

                        </Card>
                    </Col>
                       
                        
                     
                </Card>  
                    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br><br></br><br></br> <br></br>
                    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br><br></br><br></br> <br></br> 
                    <br/><br/> <br/><br/> <br/><br/> <br/><br/> 
                    <br/><br/> <br/><br/> <br/><br/> <br/><br/>  
        {/*--------------------------------------------------------------------------------------------------------------------------*/}   
                    <br></br> 
            {this.state.showGraph && 
                <Card
                style={{ width: 1000}}
                >
                <LineChart width={730} height={250} data={dataInTable}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="error" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line name="error" type="monotone" dataKey="error" stroke="#8884d8" />
                </LineChart>
                </Card>
            }
        {/*--------------------------------------------------------------------------------------------------------------------------*/}   


                    {this.state.showOutputCard &&
                        
                    <content>  
                            <Card
                            title={"Output"}
                            bordered={true}
                            style={{width: "100%", background: "#DEB887", color: "#FFFFFFFF", float:"inline-start", marginBlockStart:"2%"}}
                            id="outputCard"
                            >
                                <Table columns={columns} dataSource={dataInTable}  bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black"}}
                                ></Table>
                            </Card>
                    </content> 
                    }                    
                </div>
                             
            </div>
        );
    }
}
export default Bisection;