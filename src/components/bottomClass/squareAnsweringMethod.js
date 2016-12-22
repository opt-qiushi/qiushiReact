import React, { Component } from 'react'
import './SquareAnsweringMethod.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import UploadVoice from './uploadVoice.js'
import Dialog from 'material-ui/Dialog'
const labelStyle = {
	color: "white"
}
const btnStyle = {

}
export default class SquareAnsweringMethod extends Component{
	constructor(props){
		super(props)
		this.state={
			status:0,
			content:'',
			open:false,
			openContent:''
		}
		this.showDialogue=this.showDialogue.bind(this)
		this.textInput=this.textInput.bind(this)
		this.voiceInput=this.voiceInput.bind(this)
		this.onTextChange=this.onTextChange.bind(this)
		this.handleSendAnswer=this.handleSendAnswer.bind(this)
		this.handleClose=this.handleClose.bind(this)
	}
	handleClose(){
		this.setState({open:false})
		// if(this.state.isRedirect == true){
		// 	this.props.history.push("/square")
		// }
	}
	handleSendAnswer(){
		var content = this.state.content.trim();
		if(content.length<15){
			this.setState({open:true,openContent:'抱歉，回答不能小于十五字'})
		}else if(content.length>2000){
			this.setState({open:true,openContent:'抱歉，回答不能大于两千字'})
		}else{
			io.socket.post('/squareAnswer', {questId: this.props.squareQuestion.id, from: localStorage.getItem('userId'),answer:this.state.content}, (result, jwr) => {
	            console.log(result)
	            io.socket.get('/squareQuest?questId='+this.props.squareQuestion.id+'&page=1', {}, (result, jwr) => {
		          setTimeout(function() {
		            // this.props.addCurrentSquare(result.question.answer)
		            // this.props.history.push('/squareQuestionDetail')
		            this.props.history.push('/square')
		          }.bind(this), 500)
		      	})
	        })
		}

		
	}
	onTextChange(event){
		this.setState({content: event.target.value})
	}
	textInput(){
		this.setState({status:1})
		this.props.onChangeValue(1)
	}
	voiceInput(){
		this.setState({status:2})
		this.props.onChangeValue(1)
	}
	showDialogue(){
		const actionButton = [
		    <FlatButton
		        label="确定"
		        primary={true}
		        onTouchTap={this.handleClose} />
		    ]
		switch(this.state.status){
			case 0:
				return (<div className="selectMode">
							<div className="selectMode-left" onTouchTap={this.textInput}><img src="./img/textInput.png"/><div className="selectModeDescribtion">文字输入</div></div>
							<div className="selectMode-right" onTouchTap={this.voiceInput}><img src="./img/voiceInput.png"/><div className="selectModeDescribtion">语音输入</div></div>
						</div>)
			case 1:
				return (
						<div className="square-text-answer-area">
						<TextField
						  floatingLabelText="请输入你的回答"
					      hintText=""
					      multiLine={true}
					      rows={6}
					      rowsMax={6}
					      fullWidth={true}
					      value={this.state.content}
					      onChange={this.onTextChange}
					    />
						<FlatButton backgroundColor="#0A964C"
		      			hoverColor="#999999" label="提交回答" labelStyle={labelStyle} style={btnStyle} onTouchTap={this.handleSendAnswer}/>
					    <Dialog title="提示" actions={actionButton} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
				          {this.state.openContent}
					    </Dialog>
					    </div>
					    
					)
			case 2:
				return (
					<UploadVoice questionId={this.props.squareQuestion.id}/>
						
					)
			default:
				return
		}
	}


	render(){

		return (
				<div>{this.showDialogue()}</div>

			)
	}
}