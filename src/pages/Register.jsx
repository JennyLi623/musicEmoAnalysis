import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';

class Register extends Component {
  state = {
    email: "",
    password: "",
    repwd: "",
    username: "",
    wechat: "",
    genre: 0,
    duration: 0,
    proficiency: 0,
    musicLover: 0
  };

  handleSubmit = e => {

    const { handleLogIn } = this.props;
    const { email, password } = this.state;

    Idm.register(email, password)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, repwd, username, wechat, genre, duration, proficiency, musicLover} = this.state;

    return (
      <div>
        <h1 className="login-title">注册</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">邮箱</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
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
          <label className="label">确认密码</label>
          <input
            className="input"
            type="password"
            name="repwd"
            value={repwd}
            onChange={this.updateField}
          ></input>
          <label className="label">用户名</label>
          <input
            className="input"
            type="text"
            name="username"
            value={username}
            onChange={this.updateField}
          ></input>
          <label className="label">微信号</label>
          <input
            className="input"
            type="text"
            name="wechat"
            value={wechat}
            onChange={this.updateField}
          ></input>
          <br />
          <label className="label" style={{display: "inline"}}>最爱哪种类型:</label>
          <select value={genre} onChange={this.selectGenre} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 雅尼音乐</option>
            <option value={2}> 古典音乐</option>
            <option value={3}> 流行乐</option>
            <option value={4}> 无特别喜好</option>
          </select>
          {(genre < 4 && genre > 0) &&
          <div>
            <br /><br />
            <label className="label" style={{display: "inline"}}>大致听了多久:</label>
            <select value={duration} onChange={this.selectDuration} style={{display: "inline"}}>
              <option value={0}> （空）</option>
              <option value={1}> 半年内</option>
              <option value={2}> 0.5-1年</option>
              <option value={3}> 1-5年</option>
              <option value={4}> 5-10年</option>
              <option value={4}> 10年以上</option>
            </select>
          </div>
          }
          <br />
          <br />
          <label className="label" style={{display: "inline"}}>有无专业训练:</label>
          <select value={proficiency} onChange={this.selectProficiency} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 没有</option>
            <option value={2}> 上过兴趣班</option>
            <option value={3}> 受过专业培训</option>
          </select>
          <br />
          <br />
          <label className="label" style={{display: "inline"}}>喜欢音乐的程度:</label>
          <select value={musicLover} onChange={this.selectDegree} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 不太爱听音乐</option>
            <option value={2}> 一般般</option>
            <option value={3}> 比较爱听音乐</option>
            <option value={4}> 非常爱听音乐</option>
            <option value={4}> 某种音乐的狂热爱好者</option>
          </select>
          <Link to="/login"><button className="button" onClick={() => this.handleSubmit()}>注册</button></Link>
        </form>
        <Link to="/login"><p>已有账号？点此登录</p></Link>
      </div>
    );
  }
}

export default Register;
