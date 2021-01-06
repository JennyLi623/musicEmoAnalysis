import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';

class Login extends Component {
  state = {
    name: "",
    password: ""
  };

  handleSubmit = e => {
    const { handleLogIn } = this.props;
    const { name, password } = this.state;

    //handleLogIn(name, ""); //remove later
    Idm.login(name, password)
      .then(response => {
        console.log(response);
        if (response !== undefined){
          handleLogIn(name, "");
        }else{
          alert("User not exist, please register!");
        }
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    console.log(this.state);
    this.setState({ [name]: value });
  };

  render() {
    const { name, password } = this.state;

    return (
      <div>
        <h1  className="login-title">登录</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">用户名</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={this.updateField}
          ></input>
          <label className="label">密码</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}
          ></input>

          <Link to="/"><button className="button" onClick={() => this.handleSubmit()}>登录</button></Link>
        </form>
        <Link to="/register"><p>新用户？请前往注册</p></Link>
      </div>
    );
  }
}

export default Login;
