import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './questionAtomic.css'
import io from '../../server'

export default class QuestionAtomic extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(){
    io.socket.post('/question/getQuestionDetail', {id: this.props.questions.id}, (result, jwr) => {
      io.socket.post('/comments/getComments', {questionID: this.props.questions.id}, (result2, jwr) => {              
              this.props.getQuestionDetail(result)
              this.props.getCommentDetail(result2)
              setTimeout(function(){
              this.props.history.push("/questionDetail")
            }.bind(this),500)
          })
        })
  }

  componentDidMount(){
    if(this.props.shenglue){
      this.refs.displayNode.style.height="150px"
      this.refs.displayNode.style.maxHeight="150px"
      this.refs.displayNode.style.overflow="hidden"
    }
  }

	render(){
		const {questions}=this.props
		//处理回答的段落显示
		var rows=[]
		var k=1
		var newAnswer = questions.answer.replace(/\n/g,"/n").replace(/\r/g,"/n");
         var answerAtomic = newAnswer.split("/n")
         answerAtomic[0] = "A: " + answerAtomic[0]
         answerAtomic.forEach(function(atomic){
            rows.push(
              <div key={k}>{atomic}</div>
            );
            k++;
         })

        //处理追问循环
        var rows3=[]
        var i=1
        questions.addQuestions.forEach(function(addAtomic){
         	var newAnswer = addAtomic.answer.replace(/\n/ig,"/n").replace(/\r/ig,"/n");
            var answerAtomic = newAnswer.split("/n");
            var rows2=[]
            var j=1
            answerAtomic.forEach(function(atomic){
              rows2.push(
                <div key={j}>{atomic}</div>
              );
              j++;
            })
            rows3.push(
                <div key={i} className="dynamicBottom">
                  <div className="dynamicBottom-0">
                    <div className="dynamicBottom-0-0">追问</div>
                    <div className="dynamicBottom-0-1">{addAtomic.question}</div>
                  </div>
                  <div className="dynamicBottom-0-0">回答</div>
                  <div className="dynamicBottom-0-2">{rows2}</div>
                </div>
              );
            i++;
         })

		return (
			<div  ref="duihuakuang" className="dynamicStructure" onClick={this.handleClick} >
                <div className="dynamicHead">
                    <span className="dynamicHeadAvatar" >
                      <img src={questions.to.avatar} />
                    </span>
                      <span className="dynamicHead-1">
                        <span className="dynamicHead-1-0">
                          {questions.to.name}
                        </span>
                        <span className="dynamicHead-1-1">
                          {GMTtoTime(questions.createdAt)}
                        </span>
                      </span>
                </div>
                <div ref="displayNode" >
                  <div className="dynamicBody">
                    <p className="sign-green">
                      Q: {questions.question}
                    </p>
                    {/*<p>A: {this.props.dynamicQuestion.answer}</p>*/}
                    {rows}
                  </div>
                  {rows3}
                </div>
                <div className="dynamicStatistic">
                    <img src="img/question_detail_addCollect.png" alt="收藏数" />
                    <div>{questions.collectNum}</div>
                    <img src="img/question_detail_commentNum.png" />
                    <div>{questions.commentNum}</div>
                    <img src="img/question_detail_watch.png" />
                    <div>{questions.watchNum}</div>
                </div>
                <div className="dynamicEnd"></div>
            </div>
			)
	}
}