import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';
import VAbg from '../imgs/valence-arousal.png';
import RDot from '../imgs/red-dot.png';
import BDot from '../imgs/blue-dot.png';
import {Button} from 'react-bootstrap';
import "../css/va.css";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentDidMount() {

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Intro;
