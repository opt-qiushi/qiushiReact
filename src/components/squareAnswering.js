import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import io from '../server'
import SquareQuestion from './bottomClass/squareQuestion'
// import SquareAnsweringMethod from './bottomClass/SquareAnsweringMethod'
import SquareAnsweringMethod from '../containers/SquareAnsweringMethod'



const allStyle={
	squareToAnswer:{
		marginTop:'20px',
		height: '40px',
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
			canBeAnswer: 0,
			isAnswering:false
		}
		this.buttonField=this.buttonField.bind(this)
		this.submitAnswer=this.submitAnswer.bind(this)
		this.changeValue=this.changeValue.bind(this)
	}

	  changeValue(value){
	  	this.setState({canBeAnswer: value})
	  }


	  submitAnswer(){

	  }


	  buttonField(){
	  	if(this.state.canBeAnswer==1)

	  	return <div style={allStyle.squareToAnswer} onTouchTap={this.submitAnswer}><span className="squareToAskQuestion-inner">提交答案</span></div>
	  	else return
	  }


	  render(){
		const {squareQuestion}=this.props
		var row = []
		if(this.state.isAnswering){
			row.push()
		}
		return (
			<div>
			{this.buttonField()}
			<SquareQuestion style={allStyle.questionBox} squareQuestion={squareQuestion} />
		    <SquareAnsweringMethod onChangeValue={this.changeValue}  history={this.props.history} /> 
			</div>
		)
	}
}