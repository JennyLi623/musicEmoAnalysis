import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';
import VAbg from '../imgs/va model.png';
import RDot from '../imgs/red-dot.png';
import BDot from '../imgs/blue-dot.png';
import {Button} from 'react-bootstrap';
import "../css/va.css";

class VAcanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      x1: 0,
      y1: 0,
      val1x: -50,
      val1y: -50,
      imgHeight: 800,
      imgWidth: 800,
      rdotdisplay: "none",
      color: "#666666",
      rate: 0,
      favorite: 0,
      overallRate: 0,
      canvasNotFilled: false,
      rateNotFilled: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentDidMount() {
    var w = this.props.width;
    console.log("w: " + w);
    if (w < 800) {
      this.setState({imgHeight: w, imgWidth: w});
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = this.props.width;
    if (w < 800){
      this.setState({imgHeight: w, imgWidth: w});
    }
    else{
      this.setState({imgHeight: 800, imgWidth: 800});
    }
  }

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

  selectRate = (e) => {
    this.setState({rate: e.target.value});
    this.setState({rateNotFilled: false});
  }

  onMouseMove = (e) => {
    var x = e.nativeEvent.offsetX + e.nativeEvent.offsetX % parseInt(this.state.imgWidth / 20) - (e.nativeEvent.offsetX + e.nativeEvent.offsetX % parseInt(this.state.imgWidth / 20)) % parseInt(this.state.imgWidth / 10) - 10;
    var y = e.nativeEvent.offsetY + e.nativeEvent.offsetY % parseInt(this.state.imgHeight / 20) - (e.nativeEvent.offsetY + e.nativeEvent.offsetY % parseInt(this.state.imgHeight / 20)) % parseInt(this.state.imgHeight / 10) -10;
    this.setState({ x1: x, y1: y });
    console.log(x, y);
    //this.setState({x1: x, y1: y });
    this.setState({ val1x: parseInt(x / (this.state.imgWidth / 11)) - 5, val1y: 10 - parseInt(y / (this.state.imgHeight / 11))});
    if (Math.abs(parseInt((x) / (this.state.imgWidth / 11)) - 5) <= 5 && Math.abs(10 - parseInt(y / (this.state.imgHeight / 11)) - 5) <= 5) {
      this.setState({ rdotdisplay: "" });
    } else {
      this.setState({ rdotdisplay: "none" });
    }
  }

  handleButtonClick = () => {
    if (this.state.val1x < -5 || this.state.val1x > 5 || this.state.val1y < 0 || this.state.val1x > 10) {
      this.setState({canvasNotFilled: true});
      this.setState({color: "#dd0000"});
    }
    if (this.props.step > 1 && this.state.rate == 0) {
      this.setState({rateNotFilled: true});
    }
    if ((this.state.val1x >= -5 && this.state.val1x <= 5 && this.state.val1y >= 0 && this.state.val1y <= 10) && (this.props.step == 1 || this.state.rate != 0)) {
      this.props.processVA(this.state.y1, this.state.x1);
    }

  }

  render() {
    return (
      <div>
        <div style={{ position: 'relative' }}>
        <img src={VAbg} onClick={this.onMouseMove.bind(this)} width={this.state.imgWidth} height={this.state.imgHeight}/>
        {(Math.abs(this.state.val1x) <= 5 && Math.abs(this.state.val1y - 5) <= 5) &&
          <h1 className="hint">您当前的valence值为：{ this.state.val1x }， arousal值为：{ this.state.val1y }</h1>
        }
        {(Math.abs(this.state.val1x) > 5 || Math.abs(this.state.val1y - 5) > 5) &&
          <h1 className="hint hintsm" style={{color: this.state.color}}>{"请用鼠标点击面板输入一个有效值"}{this.state.imgHeight < 600 && <br />}{"（-10 <= arousal, valence <= 10）"}</h1>
        }
        <img src={RDot} style={{ position: 'absolute', top: this.state.y1 + 'px', left: this.state.x1 + 'px', display: this.state.rdotdisplay }} width={20} height={20}/>
        <img src={BDot} style={{ position: 'absolute', top: this.props.top + 'px', left: this.props.left + 'px', display: this.props.display }} width={20} height={20}/>
        {(this.props.step <= 9 && this.props.step > 1) &&
          <div>
            {!this.state.rateNotFilled &&
              <p className="hint hintsm" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline"}}>请为这首歌的推荐评分：</p>
            }
            {this.state.rateNotFilled &&
              <p className="hint hintsm" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline", color: "#dd0000"}}>请为这首歌的推荐评分：</p>
            }
            <select value={this.state.rate} onChange={this.selectRate} style={{display: "inline"}}>
              <option value={0}> （空）</option>
              <option value={1}> 很失望</option>
              <option value={2}> 有点失望</option>
              <option value={3}> 一般般</option>
              <option value={4}> 比较满意</option>
              <option value={5}> 非常满意</option>
            </select>
            <br />
            <br />
            <p className="hint hintsm" style={{color: "#dd5500", fontWeight: "bolder"}}>当下的情绪输入不会影响本轮的音乐推荐。</p>
          </div>
        }
        {this.props.step <= 9 &&
          <div>
            <Button className="testButtonDisplay" onClick={() => this.handleButtonClick()}>继续试验</Button>
          </div>
        }

        </div>
      </div>
    );
  }
}

export default VAcanvas;
