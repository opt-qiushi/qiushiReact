import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './questionAtomic.css'
import io from '../../server'

export default class QuestionAtomic2 extends Component{
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

	render(){
		const {questions}=this.props
    //处理回答的段落显示
    var rows=[]
    var k=1
    var newAnswer = questions.answer.replace(/\n/g,"/n").replace(/\r/g,"/n");
         var answerAtomic = newAnswer.split("/n");
         answerAtomic[0] = "A: " + answerAtomic[0];
         answerAtomic.forEach(function(atomic){
            rows.push(
              <div key={k}>{atomic}</div>
            );
            k++;
         })//处理回答的段落显示
    var rows=[]
    var k=1
    var newAnswer = questions.answer.replace(/\n/g,"/n").replace(/\r/g,"/n");
         var answerAtomic = newAnswer.split("/n");
         answerAtomic[0] = "A: " + answerAtomic[0];
         answerAtomic.forEach(function(atomic){
            rows.push(
              <div key={k}>{atomic}</div>
            );
            k++;
         })
		return (
			<div  className="dynamicStructure" onClick={this.handleClick} >
                <div className="dynamicHead">
                    <span className="dynamicHeadAvatar" >
                      <img src={questions.from.avatar} />
                    </span>
                      <span className="dynamicHead-1">
                        <span className="dynamicHead-1-0">
                          {questions.from.name}
                        </span>
                        <span className="dynamicHead-1-1">
                          {GMTtoTime(questions.createdAt)}
                        </span>
                      </span>
                </div>
                <div className="dynamicBody">
                  <p className="sign-green">
                    Q: {questions.question}
                  </p>
                  {rows}
                  {/*<p>A: {this.props.dynamicQuestion.answer}</p>*/}
                </div>
                {/*<div className="dynamicStatistic">
                                    <img src="./img/question_detail_addCollect.png" alt="收藏数" />
                                    <div>{questions.collectNum}</div>
                                    <img src="./img/question_detail_commentNum.png" />
                                    <div>{questions.commentNum}</div>
                                    <img src="./img/question_detail_watch.png" />
                                    <div>{questions.watchNum}</div>
                                </div>*/}
                <div className="dynamicEnd"></div>
            </div>
			)
	}
}