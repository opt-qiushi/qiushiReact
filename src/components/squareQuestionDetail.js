import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import io from '../server'
import SquareQuestion from './bottomClass/squareQuestion'
import SquareAnswerPool from './bottomClass/squareAnswerPool'

export default class SquareQuestionDetail extends Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		const {squareQuestion}=this.props
		return (
			<div>
			<SquareQuestion squareQuestion={squareQuestion} />
			<SquareAnswerPool squareQuestion={squareQuestion}/>
			</div>
		)
	}
}