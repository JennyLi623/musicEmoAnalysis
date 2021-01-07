import React, { Component, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/style.css";

class NavBar extends Component {
  render() {
    const { handleLogOut, loggedIn, name } = this.props;
    return (
      <Navbar style={{background: "#141a20"}} variant="dark" expand="lg">
        <Navbar.Brand to="/">爱么音乐</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink to="/faq" className="navbar-nav nav-link mr-auto" style={{"color": "#999999"}}>
              项目介绍
          </NavLink>
          {/*
            <Nav className="mr-auto">
            <NavDropdown title="项目介绍" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/faq" style={{ "color": "#212529" }}>测试目的</Link></NavDropdown.Item>
              <NavDropdown.Item to="/faq/2"><Link to="/faq" style={{ "color": "#212529" }}>测试过程</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="/fag/3"><Link to="/faq" style={{ "color": "#212529" }}>V-A表的使用</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>*/
        }
          <Nav>
            {!loggedIn &&
                <NavLink to="/login" className="nav-link">
                  登录
                </NavLink>
            }
            {!loggedIn &&
              <NavLink to="/register" className="nav-link">
                注册
              </NavLink>
            }
            {loggedIn &&
                <Nav.Link>{"你好，"+name}</Nav.Link>
            }
            {loggedIn &&
                <Nav.Link onClick={() => this.props.handleLogOut()}>退出</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
