import React, { Component } from "react";
import Idm from "../services/Idm";
import {Link} from 'react-router-dom';
import VAcanvas from './VAcanvas.jsx';
import MP3 from './MP3.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import "../css/home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: [],
      memo: "",
      step: 0,
      songnum: 1,
      initop: -50,
      inileft: -50,
      top: -50,
      left: -50,
      width: 0,
      height: 0,
      canvasWidth: 0,
      songs: ["song1", "song2", "song3", "song4"],
      favorite: -1,
      overallRate: -1
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (window.innerWidth >= 820) {
      this.setState({canvasWidth: 800});
      console.log("window.innerWidth: " + window.innerWidth + "  canvasWidth: " + 800);
    }
    else{
      this.setState({canvasWidth: window.innerWidth - 20});
      console.log("window.innerWidth: " + window.innerWidth + "  canvasWidth: " + window.innerWidth);
    }

  }

  handleSubmit = e => {
    this.props.handleMovieSearch(this.state, this.state.offset);
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  processVA = (top, left) => {
    if (this.state.step === 1) {
      this.setState({
        initop: top,
        inileft: left
      });
    }
    this.setState({
        step: this.state.step + 1,
        top: top,
        left: left
      });
  }

  selectOverallRate = (e) => {
    this.setState({overallRate: e.target.value});
  }

  selectFavoriteSong = (e) => {
    this.setState({favorite: e.target.value});
  }

  startTest = () => {
    this.setState({step: this.state.step + 1});
  }

  endTest = () => {
    if (this.state.overallRate > 0 && this.state.favorite > 0) {
        this.props.handleLogOut();
    }else {
      if (this.state.overallRate < 0) {
        this.setState({overallRate: 0});
      }
      if(this.state.favorite < 0) {
        this.setState({favorite: 0});
      }
    }
  }

  audioEnd = (writingComment) => {
    if (!writingComment) {
      this.setState({step: this.state.step + 1, songnum: this.state.songnum + 1});
    }
  }

  render() {
    if(this.props.loggedIn === false) {
      return(
        <div>
          <h1>请先登录或者注册，谢谢！</h1>
        </div>
      );
    }
    if (this.state.step === 0) {
      return(
        <div className="mainPage">
        <div className="introclass">
          <p className='sTitle'>测试入口</p>
          <p className="intro">
              本测试旨在测试音乐对人情绪的影响。<br/>
              测试将分为<span className="numOfTest">5</span> 轮进行，
              {this.state.width >=600 && <br/>}
              我们希望您在<span className="numOfTest">1</span> 天之中完成不多余<span className="numOfTest">1</span> 轮测试，{this.state.width >=600 && <br/>}
              并在<span className="numOfTest">10</span> 天之内完成所有测试。<br/>
              每<span className="numOfTest">1</span> 轮测试开始前我们都将请您输入您当下的情绪数据（采用V-A模型），{this.state.width >=600 && <br/>}
              之后您将听到<span className="numOfTest">4</span> 首不同的钢琴曲。<br/>
              如果音乐唤起了您的部分记忆或情绪，{this.state.width >=600 && <br/>}
              我们希望您能在网页提供的输入框内简单输入。<br/>
              在每首钢琴曲结束之后，我们同样会使用V-A模型来采取您情绪变化的数据，{this.state.width >=600 && <br/>}
              以供实验对比。<br />
              该V-A值将在之后用来调整算法，不会影响本轮音乐推荐。<br/><br/>

              这是您的第<span className="numOfTest">{this.props.expNum}</span> 轮测试
          </p>
          <div>

            <Button className="testButtonDisplay" onClick={() => this.startTest()}>开始试验</Button>
          </div>
        </div>
        </div>
      );
    }
    if (this.state.step === 10) {
      return(
        <div className="mainPage">
          <div className="introclass">
            <p className='sTitle'>恭喜您，完成本轮测试</p>
            <p className='hint'>当前测试进度为 3 / 5， <br /><br />请于10月6日之前完成剩余部分</p>
            <div style={{display: "block"}}>
              {this.state.favorite === 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline", color: "#dd0000"}}>请选择本轮您最满意的曲目：</p>
              }
              {this.state.favorite !== 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline"}}>请选择本轮您最满意的曲目：</p>
              }
              <select value={this.state.favorite} onChange={this.selectFavoriteSong} style={{display: "inline"}}>
                <option value={0}> （空）</option>
                <option value={1}> {this.state.songs[0]}</option>
                <option value={2}> {this.state.songs[1]}</option>
                <option value={3}> {this.state.songs[2]}</option>
                <option value={4}> {this.state.songs[3]}</option>
              </select>
              <br />
              <br />
              {this.state.overallRate === 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline", color: "#dd0000"}}>请为本轮推荐的曲目做总评分：</p>
              }
              {this.state.overallRate !== 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline"}}>请为本轮推荐的曲目做总评分：</p>
              }
              <select value={this.state.overallRate} onChange={this.selectOverallRate} style={{display: "inline"}}>
                <option value={0}> （空）</option>
                <option value={1}> 很失望</option>
                <option value={2}> 有点失望</option>
                <option value={3}> 一般般</option>
                <option value={4}> 比较满意</option>
                <option value={5}> 非常满意</option>
              </select>
            </div>
            <br />
            <br />
            <div>
              <Button className="testButtonDisplay" onClick={() => this.endTest()}>退出登录</Button>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 10) {
      return(
        <div className="mainPage">
          <div className="inTest">
          <p className='sTitle'>恭喜您已完成本次测试的听歌部分，<br />请完成以下问卷以结束测试：</p>
          <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
          {/*
          <VAcanvas width={this.state.canvasWidth} endTest = {this.endTest} step={this.state.step} display="inherit" top={this.state.top === -50? this.state.initop : this.state.top} left={this.state.left === -50? this.state.inileft : this.state.left}}/>
          */}
          </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 1) {
      return(
        <div className="mainPage">
          <div className="inTest">
          <p className='sTitle'>请输入您当下的情绪：</p>
          <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
          <VAcanvas width={this.state.canvasWidth} processVA = {this.processVA} step={this.state.step} display="none"/>
          </div>
          </div>
        </div>
      );
    }
    if (this.state.step !== 0 && this.state.step % 2 === 0) {
      return(
        <div className="mainPage">
          <div className="inTest">
            <p className='sTitle'>请听歌曲 {this.state.songnum}/ 4</p>
            <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
              <MP3 width={this.state.canvasWidth} audioEnd = {this.audioEnd}/>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step !== 0 && this.state.step % 2 === 1) {
      return(
        <div className="mainPage">
          <div className="inTest">
          <p className='sTitle stsm'>请输入您当下的情绪：</p>
          <p className='hint itsm'>(蓝点作为参考表示上一次输入的值)</p>
          <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
          <VAcanvas width={this.state.canvasWidth} processVA = {this.processVA} step={this.state.step} display="inherit" top={this.state.top === -50? this.state.initop : this.state.top} left={this.state.left === -50? this.state.inileft : this.state.left}/>
          </div>
          </div>
        </div>
      );
    }
    return (
      <div>
      </div>
    );
  }
}

export default Home;
