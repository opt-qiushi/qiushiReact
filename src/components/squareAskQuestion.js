import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import io from '../server'
import './SquareAskQuestion.css'

export default class SquareAskQuestion extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
			<TextField
		      hintText="请输入你的问题"
		      multiLine={true}
		      rows={1}
		      rowsMax={4}
		    /><br />
		    </div>
		)
	}
}