import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import QuestionAtomicBinding from '../containers/questionAtomicBinding'
import CommentAtomicBinding from '../containers/commentAtomicBinding'
import UserCommentBinding from '../containers/userCommentBinding'
import io from '../server'


const style = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white'
};

const style2 = {
  marginTop: "24px",
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
};


export default class QuestionDetailComp extends Component{
  constructor(props){
    super(props)
    this.showComment=this.showComment.bind(this)
    this.showQuestion=this.showQuestion.bind(this)
  }

  showComment(){
    if(this.props.comments!="") return <Paper style={style2} zDepth={2} children={<CommentAtomicBinding />} />
      else return 
  }

  showQuestion(){
    if(this.props.questions!="") return <Paper style={style} zDepth={2} children={<QuestionAtomicBinding />} />
      else return
  }

  componentWillMount(){
    this.props.notShouye()
    window.scrollTo(0,0)
    io.socket.post('/question/getQuestionDetail', {id: this.props.questionId}, (result, jwr) => {
      io.socket.post('/comments/getComments', {questionID: this.props.questionId}, (result2, jwr) => {              
              this.props.getQuestionDetail(result)
              this.props.getCommentDetail(result2)
          })
    })
  }

	render(){
		return (
			<div>
				{this.showQuestion()}
        {this.showComment()}
        <Paper style={style2} zDepth={2} children={<UserCommentBinding />} />
		  	</div>
			)
	}
}