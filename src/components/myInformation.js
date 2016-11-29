import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {green500} from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'
import io from '../server'

export default class MyInformation extends Component{
	constructor(props){
		super(props)
		this.state={
			name: "",
			title: "",
			content:"",
			open: false
		}
		this.handleChangeName=this.handleChangeName.bind(this)
		this.handleChangeTitle=this.handleChangeTitle.bind(this)
		this.handleChangeContent=this.handleChangeContent.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)
		this.handleClose=this.handleClose.bind(this)
	}

	handleClose(){
		this.setState({open:false})
		setTimeout(function(){
            this.props.history.push("/Wode")
        }.bind(this),500)
	}

	handleChangeName(event){
		this.setState({name: event.target.value})
	}

	handleChangeTitle(event){
		this.setState({title: event.target.value})
	}

	handleChangeContent(event){
		this.setState({content: event.target.value})
	}

	handleSubmit(){
		var temp1, temp2, temp3
		temp1=this.state.name?this.state.name:this.props.userInfo.name
		temp2=this.state.title?this.state.title:this.props.userInfo.title
		temp3=this.state.content?this.state.content:this.props.userInfo.introduction
		io.socket.post('/professional/updateUserInfo',{id:this.props.userInfo.id,name:temp1,title:temp2,introduction:temp3},(result, jwr) => {
			this.setState({open: true})
        })
	}

	componentWillMount(){
		this.props.notShouye()
		window.scrollTo(0,0)
		this.setState({name: this.props.userInfo.name, title:this.props.userInfo.title, content: this.props.userInfo.introduction})
	}

	render(){
		const actionButton = [
		    <FlatButton
		        label="确定"
		        primary={true}
		        onTouchTap={this.handleClose} />
		    ]
		return (
			<div style={{textAlign:"center"}}>
				<TextField
							style={{textAlign:'justify'}}
							floatingLabelFocusStyle={{color:green500}}
							underlineFocusStyle={{borderColor:green500}}
			              	floatingLabelText="您的昵称"
			             	value={this.state.name}
			             	onChange={this.handleChangeName} />
			    <TextField
							style={{textAlign:'justify'}}
							floatingLabelFocusStyle={{color:green500}}
							underlineFocusStyle={{borderColor:green500}}
			              	floatingLabelText="您的头衔"
			             	value={this.state.title}
			             	multiLine={true}
			           		rowsMax={2}
			             	rows={1} 
			             	onChange={this.handleChangeTitle} />
			    <TextField
							style={{textAlign:'justify'}}
							floatingLabelFocusStyle={{color:green500}}
							underlineFocusStyle={{borderColor:green500}}
			              	floatingLabelText="您的简介"
			             	value={this.state.content}
			             	multiLine={true}
			           		rowsMax={4}
			             	rows={1} 
			             	onChange={this.handleChangeContent} />
			     <div style={{marginTop: "20px"}}>
			     <RaisedButton
		             	backgroundColor="#4CAF50"
		             	labelColor="white"
		             	label="确认"  onTouchTap={this.handleSubmit} />
		         </div>
		         <Dialog
			          title="提示"
			          actions={actionButton}
			          modal={false}
			          open={this.state.open}
			          onRequestClose={this.handleClose}
			        	>
			          个人信息修改成功！
			        </Dialog>
		     </div>
			)
	}
}