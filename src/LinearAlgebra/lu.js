import React, { Component } from 'react'
import {Card, Input, Button, Table,Row,Col, Layout} from 'antd';
import 'antd/dist/antd.css';
import { range, compile,det,lusolve,format } from 'mathjs';

const InputStyle = {
    background: "#f58216",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};


var A = [], B = [], matrixA = [], matrixB = [], output = [], decompose;
class LU extends Component {
    
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm : true,
            showDimentionButton: true,
            showMatrixForm: false,
            showMatrixButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.Lu = this.Lu.bind(this);
    
    }

    Lu(n) {
        this.initMatrix();
        decompose = lusolve(A, B)
        for (var i=0 ; i<decompose.length ; i++) {
            output.push(Math.round(decompose[i]));
            output.push(<br/>)
        }
        this.setState({
            showOutputCard: true
        });

      
    }
    
    printFraction (value) {
        return format(value, { fraction: 'ratio' })
    }

    createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"#f58216", 
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"#f58216", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
                
            
        }

        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,
            showMatrixButton: true
        })
        

    }
    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div style={{ background: "#BDB76B", padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>LU Decomposition</h2>
                <div>
                    <Card
                      title={"INPUT LU"}
                      bordered={true}
                      style={{ width: 1000, background: "#DEB887", color: "#FFFFFFFF"}}
                      onChange={this.handleChange}
                    >
                        {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}</div>}
                        
                        {this.state.showDimentionForm && 
                            <div>
                                <Col span={8}>
                                <h2>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                <h2>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                                </Col>
                                <br/><br/> <br/><br/> <br/><br/> 
                                <br/><br/> 
                            </div> 
                            
                        }
                        <br></br>
                        {this.state.showDimentionButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>this.createMatrix(this.state.row, this.state.column)
                                }  
                                style={{background: "#4caf50", color: "white", fontSize: "20px"}}>
                                Submit<br></br>
                                </Button>
                        }
                        {this.state.showMatrixButton && 
                            <Button 
                                id="matrix_button"  
                                style={{background: "#4caf50", color: "white", fontSize: "20px"}}
                                onClick={()=>this.Lu(this.state.row)}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    <br/><br/> <br/><br/> 
                    {this.state.showOutputCard &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: 400, background: "#DEB887", color: "black", float:"left"}}
                        onChange={this.handleChange}  id="answerCard">
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>{output}</p>
                        </Card>
                    }

                   
                </div>

                
            </div>
        );
    }
}
export default LU;