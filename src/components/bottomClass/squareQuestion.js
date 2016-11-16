import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './squareQuestion.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
//广场问题
const FlatButtonStyle = {
  lineHeight:"35px",
  border:"1px solid #0A964C"
}
export default class SquareQuestion extends Component{
  constructor(props){
    super(props)
    this.enterQuestionDetail = this.enterQuestionDetail.bind(this)
  }

  componentDidMount(){

  }
  enterQuestionDetail(){
    if(this.props.readyAsk === "1"){
      this.props.onChange(this.props.squareQuestion)
    }
  }
	render(){
    var rows= []
    const {squareQuestion}=this.props
    if(this.props.readyAsk){
      rows.push(<div className="square-answer-line" key="1"><FlatButton style={FlatButtonStyle} hoverColor="#0A964C" rippleColor="#0A964C" backgroundColor="#FFF" labelStyle={{color:"#0A964C"}} label="立即回答" /></div>)
    }
    var deadline = Date.parse(squareQuestion.deadline);
    var nowTime = Date.now();
    var lastTime = (deadline-nowTime)/(1000*60*60);
    var showTime = '-';
    if(lastTime<0){
      showTime = "0"
    }else if(lastTime>0){
      showTime = lastTime.toFixed(2)
    }
    
    // var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || ""; 
		return (
			<div  ref="duihuakuang" className="squareStructure" onTouchTap={this.enterQuestionDetail}>
                <div className="squareHead">
                    <span className="squareHeadAvatar" >
                      <img src="./img/empty.png"  />
                    </span>
                    <span className="squareHead-1-0">
                      {squareQuestion.from.name}
                    </span>
                    <span className="squareHead-1-1">
                      剩余{showTime}小时
                    </span>
                    <br/>
                    <span className="squareHead-2-0">
                      <img src="./img/squareAddQuestion.png" className="squareRewardImg"/>赏金{squareQuestion.reward}元
                    </span>
                    <span className="squareHead-1-1">
                      {squareQuestion.answerNum}　回答
                    </span>
                </div>
                <div className="squareBody">
                  <p className="square-question">
                    Q：{squareQuestion.question}
                  </p>
                </div>
                {rows}
                <div className="squareEnd"></div>
            </div>
			)
	}
}