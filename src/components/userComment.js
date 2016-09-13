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

export default class UserComment extends Component{
	constructor(props){
		super(props)
		this.state={
			words: "",
			open: false,
			hint: "请输入您的评论",
			duihuakuang: "评论",
			message:"评论提交成功！"
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
		if(this.props.userId==this.props.question.from){
			io.socket.post("/question/addAsk",{questionID:this.props.question.id,question:this.state.words},(result,jwr) => {
	           this.setState({words:"",open: true})
            })
		}
		else{
			io.socket.post('/comments/create', {from: this.props.userId, questionID: this.props.question.id, content: this.state.words}, (result, jwr) => {
	              
	              io.socket.post('/comments/getComments', {questionID: this.props.question.id}, (result2, jwr) => {              
	            	this.props.getCommentDetail(result2)
	            	this.setState({words:"",open: true})
	        	})
	              //var temp=this.state.commentlist.concat(result);
	              //this.setState({ commentlist: temp, value: "", status:"0" });
	         })
		}
	}

	handleClose(){
		this.setState({open: false});
	}

	handleCancel(){
		this.setState({words:""})
	}

	componentWillMount(){
		if(this.props.userId==this.props.question.from){
			this.setState({hint:"请输入您的追问", duihuakuang:"追问", message: "追问提交成功，请等待答主回答"})
		}
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
				<div className="boxtitle">我要{this.state.duihuakuang}</div>
				<div className="boxcontent">
					<TextField
						style={{textAlign:'justify'}}
						floatingLabelFocusStyle={{color:green500}}
						underlineFocusStyle={{borderColor:green500}}
		              	floatingLabelText={this.state.hint}
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
			          {this.state.message}
			        </Dialog>
		             </div>	
				</div>
             </div>
         )
	}
}