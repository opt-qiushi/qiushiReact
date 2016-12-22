import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import GMTtoTime2 from './gmtToTime2'
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
    if(this.props.squareQuestion.state==2 || this.props.squareQuestion.state == 1){
      var createAt = GMTtoTime(this.props.squareQuestion.askTime)
      return createAt
    }
    var deadline = Date.parse(this.props.squareQuestion.deadLine);
    var nowTime = Date.now();
    var lastTimeSecond=parseInt((deadline-nowTime)/1000)
    var lastTime = (deadline-nowTime)/(1000*60);
    var lastTimeHour = parseInt(lastTime/60);
    var lastTimeMinute = parseInt(lastTime%60);
    var showTime = '';
    if(lastTime<=0 || isNaN(lastTime)){
      showTime = "征集答案已完成"
    }else if(lastTime>0){
      if(lastTimeHour<=0) {
        if(lastTimeMinute==0) showTime = '剩余'+lastTimeSecond+"秒"
        else showTime = '剩余'+lastTimeMinute + '分钟'
      }
      else showTime = '剩余'+lastTimeHour + "小时" + lastTimeMinute + '分钟'
    }

    return showTime
  }

	render(){
    var rows= []
    const {squareQuestion}=this.props
    if(this.props.readyAsk && squareQuestion.state==0 && squareQuestion.from.id != localStorage.getItem('userId')){
      rows.push(<div className="square-answer-line" key="1"><FlatButton style={FlatButtonStyle} hoverColor="#0A964C" rippleColor="#0A964C" backgroundColor="#FFF" labelStyle={{color:"#0A964C"}} label="立即回答" /></div>)
    }
    
    
    var headImg = squareQuestion.from.avatar || squareQuestion.from.headimgurl || './img/vipDetail/hosthead.png';
		return (
			<div  ref="duihuakuang" className="squareStructure" onTouchTap={this.enterQuestionDetail}>
                <div className="squareHead">
                    <div className="squareHeadAvatar" >
                      <img src={headImg}  />
                    </div>
                    <div className="squareHead-1">
                      <div className="squareHead-1-0">
                        {squareQuestion.from.name}
                      </div>
                      <span className="squareHead-1-1">
                        <img src="./img/squareAddQuestion.png" className="squareRewardImg"/>赏金{squareQuestion.reward}元
                      </span>
                    </div>
                </div>
                <div className="squareBody">
                    <span className="square-question-q">Q：</span>{squareQuestion.question}
                </div>
                <div className="squareFoot">
                  <span className="squareHead-2">
                      {this.showTime()}
                  </span>
                  <span className="squareHead-3">
                    {squareQuestion.answerNum}　回答
                  </span>
                </div>
                <div className="squareEnd"></div>
            </div>
			)
	}
}