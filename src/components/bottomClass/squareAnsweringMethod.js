import React, { Component } from 'react'
import './SquareAnsweringMethod.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
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
			content:''
		}
		this.showDialogue=this.showDialogue.bind(this)
		this.textInput=this.textInput.bind(this)
		this.voiceInput=this.voiceInput.bind(this)
		this.onTextChange=this.onTextChange.bind(this)
		this.handleSendAnswer=this.handleSendAnswer.bind(this)
	}
	handleSendAnswer(){
		console.log(this.props.squareQuestion.id,this.state.content)
		io.socket.post('/squareAnswer', {questId: this.props.squareQuestion.id, from: localStorage.getItem('userId'),answer:this.state.content}, (result, jwr) => {
            console.log(result)
            io.socket.get('/squareQuest?questId='+this.props.squareQuestion.id+'&page=1', {}, (result, jwr) => {
	          setTimeout(function() {
	            this.props.addCurrentSquare(result.question.answer)
	            this.props.history.push('/squareQuestionDetail')
	          }.bind(this), 1000)
	      	})
        })
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
		switch(this.state.status){
			case 0:
				return (<div className="selectMode">
							<div className="selectMode-left" onTouchTap={this.textInput}><img src="./img/textInput.png"/></div>
							<div className="selectMode-right" onTouchTap={this.voiceInput}><img src="./img/voiceInput.png"/></div>
						</div>)
			case 1:
				return (
						<div>
						<TextField
						  floatingLabelText="请输入你的问题"
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
					    </div>
					)
			case 2:
				return
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