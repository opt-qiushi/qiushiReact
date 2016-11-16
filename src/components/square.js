import React, { Component } from 'react'
import './square.css'
import io from '../server'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/FlatButton'
import SquareQuestion from './bottomClass/squareQuestion'
//广场
const FlatButtonStyle = {
  
}
const style = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
}
export default class Square extends Component{
  constructor(props){
    super(props)
    this.askQuestion = this.askQuestion.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
  }

  componentDidMount(){
    io.socket.get("/allSquareQuest",{},(result,jwr)=>{
      console.log(result)
      this.props.applySquare(result)
    })
  }
  askQuestion(){
    location.href = "./squareAskQuestion"
  }

  handleQuestion(data){
    this.props.changeCurrentSquare(data)
    // location.href="./squareQuestionDetail"
    this.props.history.push("/squareQuestionDetail")
  }

	render(){
		var rows=[]
    const {squareQuestion}=this.props
    var i=1
    console.log(squareQuestion)
    squareQuestion.forEach(function(squareAtomic){
      rows.push(
        <SquareQuestion key={i} readyAsk="1" squareQuestion={squareAtomic} onChange={this.handleQuestion} />
        )
      i++
    }.bind(this))

    // var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || ""; 
		return (
			<div >
        <div className="askButtonPlaceholder"></div>
    {/*<Paper key={i} style={style} zDepth={2} children={<SquareQuestion readyAsk="1" history={this.props.history} questions={messageAtomic} />} />*/}
        {rows}
        <div className="squareToAskQuestion" onTouchTap={this.askQuestion}><span className="squareToAskQuestion-inner">立即提问</span></div>
      </div>
			)
	}
}