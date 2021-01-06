import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';
import CD from '../imgs/cd-clipart.png';
import Music from '../audios/IICTY.mp3';
import Dot from '../imgs/red-dot.png';
import {InputGroup, FormControl} from 'react-bootstrap';
import "../css/va.css";

class MP3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      imgWidth: 800,
      writingComment: false,
      comment: "",
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    var w = this.props.width;
    if (w < 800) {
      this.setState({imgWidth: w});
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = this.props.width;
    if (w < 800) {
      this.setState({imgWidth: w});
    }
    else{
      this.setState({imgWidth: 800});
    }
  }

  handleChange = e => {
    if (this.state.writingComment === false){
        this.setState({writingComment: true});
    }
    console.log(e.target.value);
    this.setState({ comment: e.target.value });
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



  onMouseMove = (e) => {
    var x = (e.nativeEvent.offsetX - 8) - (e.nativeEvent.offsetX - 8) % parseInt(this.state.imgWidth / 33) + this.state.imgWidth / 33 / 2 - 4;
    var y = (e.nativeEvent.offsetY - 8) - (e.nativeEvent.offsetY - 8) % parseInt(this.state.imgHeight / 25) + this.state.imgWidth / 25 / 2 - 12;
    this.setState({ x1: x, y1: y });
    //this.setState({x1: x, y1: y });
    this.setState({ val1x: parseInt(x / (this.state.imgWidth / 33)) - 16, val1y: 12 - parseInt(y / (this.state.imgHeight / 25))});
    if (Math.abs(parseInt(x / (this.state.imgWidth / 33)) - 16) <= 10 && Math.abs(12 - parseInt(y / (this.state.imgHeight / 25))) <= 10) {
      this.setState({ dotdisplay: "" });
    } else {
      this.setState({ dotdisplay: "none" });
    }
  }

  nextStage = () => {
    console.log("In next stage");
    this.props.audioEnd(false);
  }

  render() {
    return (
      <div>
        <img src={CD} width={this.state.imgWidth - 40}/>
        <audio controls autoPlay onEnded={()=> this.props.audioEnd(this.state.writingComment)}>
          <source src={Music} type="audio/mpeg" />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <br />
        <br />
        <InputGroup variant="dark">
          <InputGroup.Prepend>
            <InputGroup.Text>音乐记忆</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="With textarea" onChange={this.handleChange} value={this.state.comment}/>
        </InputGroup>
        <br />
        {!this.state.writingComment &&
          <p>——页面将在钢琴曲播放完毕后自动跳转——</p>
        }
        {this.state.writingComment &&
          <p>——请在完成描述后点击<span onClick={() => this.nextStage()} style={{"color": "blue"}}>此处</span>进入下一环节——</p>
        }
      </div>
    );
  }
}

export default MP3;
