
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Bisection from './RootOfEquation/bisection'
import FalsePosition from './RootOfEquation/false position'
import NewtonRaphson from './RootOfEquation/newton raphson';
import Onepoint from './RootOfEquation/one point';
import Secant from './RootOfEquation/secant';

import CramerRule from './LinearAlgebra/cramer rule';
import Cholesky from './LinearAlgebra/cholesky';
import Guass from './LinearAlgebra/gauss';
import Seidel from './LinearAlgebra/guass seidel';
import Jordan from './LinearAlgebra/jordan';
import LU from './LinearAlgebra/lu';

import Newton from './Interpolation/newton';
import Lagrange from './Interpolation/lagrange';
import Spline from './Interpolation/spline';

import Forward from './Differentiation/forward';
import Backward from './Differentiation/backward';
import Central from './Differentiation/central';

import CompositeTrapezoidal from './Integration/compositetrapzoidal';
import CompositeSimpson from './Integration/compositesimpson';
import SimpleTrapezoidal from './Integration/simpletrapzoidal';
import SimpleSimpson from './Integration/simplesimpson';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <Router>
      <Layout>
      <Header style={{ padding: '5px 0', background: '#gray' } } className="header">
        <div className="logo" />
        <h1 style={{color:"red"}}> &nbsp; &nbsp; NUMERICAL</h1>
      </Header>
   
      <Content style={{ padding: '10 200px' }} >
        
        <Layout style={{ padding: '5px 0', background: '#BDB76B' } }>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['']}// use key to open submenu
              style={{ height: '100%' }}
              theme="dark"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="minus" />
                    Root of Equation 
                  </span>
                }
              >
                <Menu.Item key="R1">Bisection<Link to="/bisection" /></Menu.Item>
                <Menu.Item key="R2">False Position<Link to="/false position" /></Menu.Item>
                <Menu.Item key="R3">Newton Raphson<Link to="/newton raphson" /></Menu.Item>
                <Menu.Item key="R4">One Point<Link to="/one point" /></Menu.Item>
                <Menu.Item key="R5">Secant<Link to="/secant" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="minus" />
                    Linear Algebra
                  </span>
                }
              >
                <Menu.Item key="L1">Cramer Rule<Link to="/cramer rule" /></Menu.Item>
                <Menu.Item key="L2">Guass Eliminate<Link to="/guass eliminate" /></Menu.Item>
                <Menu.Item key="L3">Guass Jordan<Link to="" /></Menu.Item>
                <Menu.Item key="L4">Guass Seidel<Link to="" /></Menu.Item>
                <Menu.Item key="L5">LU Decomposition<Link to="" /></Menu.Item>
                <Menu.Item key="L6">Cholesky Decomposition<Link to="" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="minus" />
                    Interpolation
                  </span>
                }
              >
                <Menu.Item key="I1">Newton<Link to="" /></Menu.Item>
                <Menu.Item key="I2">Lagrange<Link to="" /></Menu.Item>
                <Menu.Item key="I3">Spline<Link to="" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="minus" />
                    Regression
                  </span>
                }
              >
                <Menu.Item key="Rg1">Leastsquare</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="minus" />
                    Integration
                  </span>
                }
              >
                <Menu.Item key="Rr1">Simple Trapzoidal<Link to="/simpletrapzoidal" /></Menu.Item>
                <Menu.Item key="Rr2">Composite Trapzidal<Link to="/compositrapzoidal" /></Menu.Item>
                <Menu.Item key="Rr3">Simple Simpson<Link to="/simplesimpson" /></Menu.Item>
                <Menu.Item key="Rr4">Composite Simpson<Link to="/composisimpson" /></Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub6"
                title={
                  <span>
                    <Icon type="minus" />
                    Differentiation
                  </span>
                }
              >
                <Menu.Item key="D1">Forward<Link to="/forward" /></Menu.Item>
                <Menu.Item key="D2">Backward<Link to="/backward" /></Menu.Item>
                <Menu.Item key="D3">Central<Link to="/central" /></Menu.Item>
              </SubMenu>

            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 1000 }}>
            <Route path="/bisection" component={Bisection} />
            <Route path="/false position" component={FalsePosition} />
            <Route path="/newton raphson" component={NewtonRaphson} />
            <Route path="/one point" component={Onepoint} />
            <Route path="/secant" component={Secant} />
{/*---------------------------------------------------------------------------*/}
            <Route path="/cramer rule" component={CramerRule} />
            <Route path="/cholesky decomposition" component={Cholesky} />
            <Route path="/guass eliminate" component={Guass} />
            <Route path="/guass seidel" component={Seidel} />
            <Route path="/guass jordan" component={Jordan} />
            <Route path="/lu decomposition" component={LU} />
{/*---------------------------------------------------------------------------*/}
            <Route path="/newton" component={Newton} />
            <Route path="/lagrange" component={Lagrange} />
            <Route path="/spline" component={Spline} />
{/*---------------------------------------------------------------------------*/}
            <Route path="/forward" component={Forward} />
            <Route path="/backward" component={Backward} />
            <Route path="/central" component={Central} />
{/*---------------------------------------------------------------------------*/}
            <Route path="/compositrapzoidal" component={CompositeTrapezoidal} />
            <Route path="/composisimpson" component={CompositeSimpson} />
            <Route path="/simpletrapzoidal" component={SimpleTrapezoidal} />
            <Route path="/simplesimpson" component={SimpleSimpson} />
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: 'center', theme: '#dark' }}>For Numerical By Chanatip</Footer>
    </Layout>
    </Router>
    )
  }
}

export default App
