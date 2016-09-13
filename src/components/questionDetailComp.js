import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import QuestionAtomicBinding from '../containers/questionAtomicBinding'
import CommentAtomicBinding from '../containers/commentAtomicBinding'
import UserCommentBinding from '../containers/userCommentBinding'


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
  }

  showComment(){
    if(this.props.comments!="") return <Paper style={style2} zDepth={2} children={<CommentAtomicBinding />} />
      else return 
  }

  componentWillMount(){
    this.props.notShouye();
    window.scrollTo(0,0)
  }

	render(){
		return (
			<div>
				<Paper style={style} zDepth={2} children={<QuestionAtomicBinding />} />
        {this.showComment()}
        <Paper style={style2} zDepth={2} children={<UserCommentBinding />} />
		  	</div>
			)
	}
}