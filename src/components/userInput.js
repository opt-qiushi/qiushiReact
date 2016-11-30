import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {green500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import './userInput.css'
import io from '../server'

const buttonStyle={

}

export default class UserInput extends Component{
	constructor(props){
		super(props)
		this.state={
			words: "",
			open: false
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleCommit=this.handleCommit.bind(this)
		this.handleCancel=this.handleCancel.bind(this)
		this.handleClose=this.handleClose.bind(this)
	}

	handleChange(event){
		this.setState({words:event.target.value})
	}

	handleCommit(){
		if(this.state.words==""){
			return
		}
		var temp=this.state.words
		io.socket.post('/question/ask',{from:this.props.userId, to:this.props.person.detail.id, question: temp}, (result, jwr) => {
            this.setState({words:"",open: true})
        	});
	}

	handleClose(){
		this.setState({open: false});
	}

	handleCancel(){
		this.setState({words:""})
	}

	render(){
		const actionButton = [
		    <FlatButton
		        label="确定"
		        primary={true}
		        onTouchTap={this.handleClose} />
		    ];
		return (
			<div className="box">
				<div className="boxtitle">我要提问</div>
				<div className="boxcontent">
					<TextField
						style={{textAlign:'justify'}}
						floatingLabelFocusStyle={{color:green500}}
						underlineFocusStyle={{borderColor:green500}}
		              	floatingLabelText="请输入您的问题"
		              	multiLine={true}
		           		rowsMax={4}
		             	rows={1} 
		             	value={this.state.words}
		             	onChange={this.handleChange} />
		             <div className="button">
		             	<RaisedButton
		             	backgroundColor="#4CAF50"
		             	labelColor="white"
					      label="确认" onTouchTap={this.handleCommit} />
					     <RaisedButton
					     style={{marginLeft:"30px"}}
					      label="取消" onTouchTap={this.handleCancel} />
					 <Dialog
			          title="提示"
			          actions={actionButton}
			          modal={false}
			          open={this.state.open}
			          onRequestClose={this.handleClose}
			        	>
			          感谢您的提问，请耐心等候答主回答
			        </Dialog>
		             </div>	
				</div>
             </div>
         )
	}
}