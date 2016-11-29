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
			content:"",
			open: false
		}
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


	handleChangeContent(event){
		this.setState({content: event.target.value})
	}

	handleSubmit(){
		io.socket.post("/feadback/create",{msg:this.state.content},(result, jwr) => {
                this.setState({open: true})
         })
	}

	componentWillMount(){
		this.props.notShouye()
		window.scrollTo(0,0)
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
			              	floatingLabelText="您的问题反馈"
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
			          您的问题已提交后台，感谢您的反馈！
			        </Dialog>
		     </div>
			)
	}
}