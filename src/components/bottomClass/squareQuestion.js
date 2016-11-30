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
    this.showTime = this.showTime.bind(this)
  }

  componentDidMount(){

  }
  enterQuestionDetail(){
    if(this.props.readyAsk === "1"){
      this.props.onChange(this.props.squareQuestion)
    }
  }

  showTime(){
    if(this.props.squareQuestion.state==2){
      return 
    }
    var deadline = Date.parse(this.props.squareQuestion.deadLine);
    var nowTime = Date.now();
    var lastTime = (deadline-nowTime)/(1000*60);
    var lastTimeHour = lastTime/60;
    var lastTimeMinute = lastTime%60;
    var showTime = '';
    if(lastTime<=0){
      showTime = "0分钟"
    }else if(lastTime>0){
      if(lastTimeHour<=0) showTime = lastTimeMinute + '分钟'
      else showTime = lastTimeHour + "小时" + lastTimeMinute + '分钟'
    }

    return '剩余'+showTime
  }

	render(){
    var rows= []
    const {squareQuestion}=this.props
    if(this.props.readyAsk && squareQuestion.state==0){
      rows.push(<div className="square-answer-line" key="1"><FlatButton style={FlatButtonStyle} hoverColor="#0A964C" rippleColor="#0A964C" backgroundColor="#FFF" labelStyle={{color:"#0A964C"}} label="立即回答" /></div>)
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
                      {this.showTime()}
                      
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