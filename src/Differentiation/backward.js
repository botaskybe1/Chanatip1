import React, { Component } from 'react'
import {Card, Input, Button, Table,Row,Col, Layout} from 'antd';
import 'antd/dist/antd.css';
import { range, compile,det,derivative} from 'mathjs';
import axios from 'axios';

const InputStyle = {
    background: "#f58216",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var y, error, exact;
class Backward extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            number: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    backwardh2(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.func(x) - this.func(x-(1*h))) / h
                break;
            case 2:
                y = (this.func(x) - 2*this.func(x-(1*h)) + this.func(x-(2*h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x) - 3*this.func(x-(1*h)) + 3*this.func(x-(2*h)) - this.func(x-(3*h))) / Math.pow(h, 3)
                break;
            default:
                y = (this.func(x) - 4*this.func(x-(1*h)) + 6*this.func(x-(2*h)) - 4*this.func(x-(3*h)) + this.func(x-(4*h))) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((y - exact) / y)*100
        this.setState({
            showOutputCard: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
    }
    API = async(number)=>{
            
        var response = await axios.get('http://localhost:3001/api/users/showbackwardmodel').then(res => {return res.data});
        this.setState({
            fx:response['data'][number]['fx'],
            x:response['data'][number]['x'],
            h:response['data'][number]['h'],
            degree:response['data'][number]['degree'],
        })
        this.backwardh2(this.state.x,this.state.h,this.state.degree);
    }

    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Backward Differences </h2>
                <div style={{float:"left"}}>
                    <Card
                    title={"INPUT BACKWARD"}
                    bordered={true}
                    style={{ width: 1000, background: "#DEB887", color: "#FFFFFFFF", float:"left"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                        <Col span={8}>
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>Order derivative</h2><Input size="large" name="degree" style={InputStyle}></Input>
                        <h2>X</h2><Input size="large" name="x" style={InputStyle}></Input>
                        <h2>h</h2><Input size="large" name="h" style={InputStyle}></Input><br/><br/>
                        </Col>
                        <br/><br/> <br/><br/> <br/><br/> 
                        <br/><br/> <br/><br/> <br/><br/>
                        <br/><br/> <br/><br/> <br/><br/> 
                        <Button id="submit_button" onClick= {
                                ()=>this.backwardh2(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
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
                        <br/><br/> <br/><br/> <br/><br/> 
                        <br/><br/> <br/><br/> <br/><br/>
                        <br/><br/> <br/><br/> <br/><br/>
                        <br/><br/> <br/><br/> <br/><br/>
                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "1000", background: "#DEB887", color: "black", float:"left"}}
                        id="outputCard"
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                y = {y.toFixed(8)}<br/>
                                Exact = {exact.toFixed(8)}<br/>
                                Error(ε) = {error.toFixed(4)}%<br/>
                            </p>
                        </Card>
                    }              
                </div>                
            </div>
        );
    }
}
export default Backward;