import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import io from '../server'
import SquareQuestion from './bottomClass/squareQuestion'

export default class SquareQA extends Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return (
			<div>
			<header>SquareQA</header>
			<SquareQuestion/>

			</div>
		)
	}
}