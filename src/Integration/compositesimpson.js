import React, {Component} from 'react';
import axios from 'axios';
import {Card, Input, Button, Table,Row,Col, Layout} from 'antd';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
var Algebrite = require('algebrite')

const InputStyle = {
    background: "#f58216",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var I, exact, error;
class CompositeSimpson extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            number: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    compositesimpson(a, b, n) {
        var h = (b-a)/n
        I = (h / 3) * (this.func(a) + this.func(b) + 4*this.summationFunction(1, n, h) + 2*this.summationFunction(2, n, 2*h))
        exact = this.exactIntegrate(a, b)
        error = (Math.abs((I-exact) / I) * 100)
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i=1 ; i<n ; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    API = async(number)=>{
        var response = await axios.get('http://localhost:3001/api/users/showcompositesmodel').then(res => {return res.data});
        this.setState({
            fx:response['data'][number]['fx'],
            a:response['data'][number]['a'],
            b:response['data'][number]['b'],
            n:response['data'][number]['n']
            
        })
        this.compositesimpson(this.state.a,this.state.b,this.state.n);
    }
    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Composite Simpson Rule</h2>
                <div style={{float:"left"}}>
                    <Card
                    title={"INPUT COMPOSITE SIMPSON"}
                    bordered={true}
                    style={{ width: 1000, background: "#DEB887", color: "#FFFFFFFF", float:"left"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >   
                        <Col span={8}>
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>Lower(a)</h2><Input size="large" name="a" style={InputStyle}></Input>
                        <h2>Upper(b)</h2><Input size="large" name="b" style={InputStyle}></Input>
                        <h2>N</h2><Input size="large" name="n" style={InputStyle}></Input><br/><br/>
                        </Col>
                        <br/><br/> <br/><br/> <br/><br/> 
                        <br/><br/> <br/><br/> <br/><br/>
                        <br/><br/> <br/><br/> <br/><br/> 
                        
                        <Button id="submit_button" onClick= {
                                ()=>this.compositesimpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
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
                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "1000", background: "#DEB887", color: "black", float:"left"}}
                        id="outputCard"
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Ans = {I}<br/>
                                Exact = {exact}<br/>
                                Error = {error}%
                            </p>
                        </Card>
                    }              
                </div>                
            </div>
        );
    }
}
export default CompositeSimpson;