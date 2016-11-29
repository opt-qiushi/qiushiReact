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
	}


	  componentDidMount(){
	  	
	  }


	  render(){
		const {squareQuestion}=this.props
		return (
			<div>
			<div style={allStyle.placeHolder}></div>
			<SquareQuestion style={allStyle.questionBox} squareQuestion={squareQuestion} />
			<SquareSelectPool />
			<SquareAnswerPool squareQuestion={squareQuestion}/>
			<div style={allStyle.squareToAnswer} onTouchTap={this.askQuestion}><span className="squareToAskQuestion-inner">提交采纳</span></div>
			</div>
		)
	}
}