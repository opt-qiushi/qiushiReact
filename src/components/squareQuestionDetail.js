import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import io from '../server'
import SquareQuestion from './bottomClass/squareQuestion'
import SquareAnswerPool from './bottomClass/squareAnswerPool'
import SquareSelectPool from '../containers/squareSelectPool2'

const allStyle={
	squareToAnswer:{
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '60px',
		backgroundColor: 'white'
	},
	inner:{
		display: 'inline-block',
		width: '80%',
		marginLeft: '10%',
		marginTop: '20px',
		height: '40px',
		background: '#0A964C',
		color: 'white',
		lineHeight: '40px',
		textAlign: 'center',
		borderRadius: '30px'
	},
	placeHolder:{
		height:'60px'
	}
}

export default class SquareQuestionDetail extends Component{
	constructor(props){
		super(props)
		this.state={
			pageCategory: 2
		}
		this.hasAdoptArea=this.hasAdoptArea.bind(this)
		this.buttonField=this.buttonField.bind(this)
		this.adoptQuestion=this.adoptQuestion.bind(this)
		this.answerQuestion=this.answerQuestion.bind(this)
	}


	  componentDidMount(){
	  	 io.socket.get('/squareType', {questionId: this.props.squareQuestion.id, userId: localStorage.getItem('userId')}, (result, jwr) => {
	  	 	console.log(result)
            this.setState({pageCategory: result.pageCategory})
        })
	  }

	  hasAdoptArea(){
<<<<<<< HEAD
<<<<<<< HEAD
	  	if(this.state.pageCategory==2 || this.state.pageCategory==4 || this.state.pageCategory==5)
=======
=======
>>>>>>> origin/devJUE
	  	/* 这里记得改回1 */
	  	if(this.state.pageCategory==1 || this.state.pageCategory==4 || this.state.pageCategory==5)
>>>>>>> origin/devJUE
	  	return <SquareSelectPool pageCategory={this.state.pageCategory} />
	  	else return
	  }

	  answerQuestion(){
	  	this.props.history.push("/upload")
	  }

	  adoptQuestion(){

	  }

	  buttonField(){
	  	if(this.state.pageCategory==1)

	  	return <div style={allStyle.squareToAnswer} onTouchTap={this.adoptQuestion}><span className="squareToAskQuestion-inner">提交采纳</span></div>

	  	else if(this.state.pageCategory==2 && this.props.squareQuestion.state==0)

	  	return <div style={allStyle.squareToAnswer} onTouchTap={this.answerQuestion}><span className="squareToAskQuestion-inner">我要回答</span></div>

	  	else return
	  }


	  render(){
		const {squareQuestion}=this.props
		return (
			<div>
			<div style={allStyle.placeHolder}></div>
			<SquareQuestion style={allStyle.questionBox} squareQuestion={squareQuestion} />
			{this.hasAdoptArea()}
			<SquareAnswerPool squareQuestion={squareQuestion} pageCategory={this.state.pageCategory} />
			{this.buttonField()}
			</div>
		)
	}
}