import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider'
import { History } from 'react-router'
import GMTtoTime from './gmtToTime'
import io from '../../server'
import "./asklistComp.css"

const style={
	width: "100%",
	color: "black",
	height: "auto"
}

export default class AsklistComp extends Component{
	constructor(props){
		super(props)
		this.handleClick=this.handleClick.bind(this)
	}


	handleClick(){
		if(!this.props.flag){
			this.props.onDialog()
			return 
		} 
		io.socket.post('/question/getQuestionDetail', {id: this.props.contentAtomic.id}, (result, jwr) => {
			io.socket.post('/comments/getComments', {questionID: this.props.contentAtomic.id}, (result2, jwr) => {              
            	this.props.getQuestionDetail(result)
            	this.props.getCommentDetail(result2)
            	setTimeout(function(){
		        	this.props.history.push("/questionDetail")
		        }.bind(this),500)
        	})
        })
	}

	render(){
		const {contentAtomic, answerRow}=this.props
		return (
			<FlatButton style={style} onTouchTap={this.handleClick} >
	              		<div className="askercontainer">
		                  <div className="askpersonImg">
		                    <img src={contentAtomic.from.avatar} id="askpersonimg" />
		                  </div>
		                  <div className="asker">
		                    <div className="askername">{contentAtomic.from.name}</div>
		                    <div className="askertime">{GMTtoTime(contentAtomic.createdAt)}</div>
		                  </div>
		                </div>
		                <div>
		                  <div className="question">
		                    <b>Q</b>:{contentAtomic.question}
		                  </div>
		                  {answerRow}
		                </div>
		                <Divider   />
	          </FlatButton>
			)
	}
}