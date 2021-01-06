import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/faq.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import VAbg from '../imgs/va model.png';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      questions: [false, false, false, false, false],
      imgHeight: 740,
      imgWidth: 740,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  ifShowContent = (num) => {
    let q = this.state.questions;
    q[num] = !q[num];
    this.setState({questions: q});
  }

  componentDidMount() {
    var w = window.innerWidth;
    console.log("w: " + w);
    if (w < 820) {
      this.setState({imgHeight: w * 0.7, imgWidth: w * 0.7});
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = window.innerWidth;
    if (w >= 820){
      this.setState({imgHeight: 740, imgWidth: 740});
    }
    else{
      this.setState({imgHeight: w * 0.7, imgWidth: w * 0.7});
      console.log(w * 0.7);
    }
  }


  render() {
    return (
      <div className="disclaimer">
        <h1 className="disclaimer-title">项目介绍</h1>
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(0)}>
            测试目的
          </p>
          {this.state.questions[0] &&
            <p className="faq-content">
            本测试旨在测试音乐对人情绪的影响。<br/>
          </p>}
        </div>
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(1)}>
            测试过程
          </p>
          {this.state.questions[1] &&
            <div>
            <p className="faq-content">
            本测试将分为5轮进行，<br/>
            我们希望您在一天之中完成不多余一轮测试，<br/>
            并在十天之内完成所有测试。<br/>
            每一轮测试开始前我们都将请您输入您当下的情绪数据（采用V-A模型），<br/>
            之后您将听到四首不同的钢琴曲。<br/>
            如果音乐唤起了您的部分记忆或情绪，<br/>
            我们希望您能在网页提供的输入框内简单输入。<br/>
            在每首钢琴曲结束之后，我们同样会使用V-A模型来采取您情绪变化的数据，<br/>
            以供实验对比。<br />
            该V-A值将在之后用来调整算法，不会影响本轮音乐推荐。<br/><br/>
          </p>
          </div>
        }
        </div>
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(2)}>
            V-A表的使用
          </p>
          {this.state.questions[2] &&
            <div>
              <p className="faq-content">
                Valence-Arousal/愉悦度-兴奋度模型是一种心理学中常用的情绪标注模型。<br/>
                其中，Valence代表情绪的积极程度，<br/>
                也就是音乐所表达的情绪是悲伤还是高兴；<br/>
                Arousal代表唤起程度的高低，<br/>
                也就是兴奋程度。<br/>
                这两个维度都是通过数值来代表其高低程度。<br/>
                比如下图所示的愉悦度区间为[-5, 5]，<br/>
                其中-5代表非常悲伤/消极，5代表非常高兴/积极；<br/>
                兴奋度区间为[0, 10] ，其中0代表平静，10代表非常激动。<br/><br/>

                根据这个定义，喜悦根据程度不同可以用Valence：5，Arousal：8等表示；<br/>
                愤怒可以用Valence：-3，Arousal：6等表示；<br/>
                抑郁则可以用Valence：-5，Arousal：2等表示。
            </p>
            <img src={VAbg} width={this.state.imgWidth} height={this.state.imgHeight}/>
          </div>
          }

        </div>
      </div>
    );
  }
}

export default Faq;
