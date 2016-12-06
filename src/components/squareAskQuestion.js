import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog'
import io from '../server'
import './SquareAskQuestion.css'
const btnStyle = {
	float:"right"
}
const labelStyle = {
	color: "white"
}
const selectStyle = {
	width: "30%"
}
const menuStyle = {
}
const textareaStyle = {
	borderLeft:"1px solid rgb(224,224,224)",
	borderRight:"1px solid rgb(224,224,224)",
	borderTop:"1px solid rgb(224,224,224)"

}
const rightSelectStyle = {
	width: "30%",
	float: "right"
}
export default class SquareAskQuestion extends Component{
	constructor(props){
		super(props)
		this.state = {value1:100,value2:30,content:'',open:false,openContent:'抱歉，问题不能为空',isRedirect:false}
		this.handleSendQuestion = this.handleSendQuestion.bind(this)
		this.handleChangeContent = this.handleChangeContent.bind(this)
		this.handleClose=this.handleClose.bind(this)
		this.openRewardProtocol=this.openRewardProtocol.bind(this)
		// this.handleChange1=this.handleChange1.bind(this)
		// this.handleChange2=this.handleChange2.bind(this)
	}

	handleChange1 = (event, index, value1) => this.setState({value1});
	handleChange2 = (event, index, value2) => this.setState({value2});
	// handleChange1(event, index, value1){
	// 	this.setState(value1)
	// }
	// handleChange2(event, index, value2){
	// 	this.setState(value2)
	// }
	handleChangeContent(event){
		this.setState({content: event.target.value})
	}
	handleSendQuestion(){
		var userId = localStorage.getItem('userId');
		var content = this.state.content.trim();
		if(content === ''){
			// window.history.pushState({},'/square')
			this.setState({open:true,openContent:'抱歉，问题不能为空'})
		}else{
			console.log("OK")
			io.socket.post("/squareQuestion", {from:userId,question:content,reward:this.state.value1,duration:this.state.value2},(result,jwr)=>{
				console.log(result)
				if(result.data === "success"){
					this.setState({open:true,openContent:'提问成功',isRedirect:true})
					// window.history.pushState('/squareQuestionDetail')
				}else{
					this.setState({open:true,openContent:'网络错误，请重试'})
				}
			})
			console.log("TED")
		}
		
	}
	handleClose(){
		this.setState({open:false})
		if(this.state.isRedirect == true){
			this.props.history.push("/square")
		}
		
		// setTimeout(function(){
  //           this.props.history.push("/Wode")
  //       }.bind(this),500)
	}
	openRewardProtocol(){
		var row = <div><div>123456</div><div>456789</div><div>ABCDEF</div></div>;
		// row.push(<div><div>123456</div><div>456789</div><div>ABCDEF</div></div>)
		this.setState({open:true,openContent:row})
	}
	render(){
		const actionButton = [
		    <FlatButton
		        label="确定"
		        primary={true}
		        onTouchTap={this.handleClose} />
		    ]
		return(
			<div className="square-ask-question">
				<div>
					<FlatButton backgroundColor="#0A964C"
	      			hoverColor="#999999" label="发布" labelStyle={labelStyle} style={btnStyle} onTouchTap={this.handleSendQuestion}/>
      			</div>
				<TextField
				  floatingLabelText="请输入你的问题"
			      hintText="回答者在时限内回答问题，需选择合适的忽地啊的态度看附件是开发的接口费 第三方科技是打飞机 少的地方就上课就分手的"
			      multiLine={true}
			      rows={6}
			      rowsMax={6}
			      fullWidth={true}
			      value={this.state.content}
			      onChange={this.handleChangeContent}
			      textareaStyle={textareaStyle}
			    /><br />
			    <SelectField
		          floatingLabelText="悬赏积分"
		          value={this.state.value1}
		          onChange={this.handleChange1}
		          style={selectStyle}
		        >
		          <MenuItem value={100} primaryText="100" />
		          <MenuItem value={200} primaryText="200" />
		          <MenuItem value={300} primaryText="300" />
		          <MenuItem value={400} primaryText="400" />
		          <MenuItem value={500} primaryText="500" />
		        </SelectField>
		        <SelectField
		          floatingLabelText="回答时限"
		          value={this.state.value2}
		          onChange={this.handleChange2}
		          style={rightSelectStyle}
		          menuStyle={menuStyle}
		        >
		          <MenuItem value={30} primaryText="3(小时)" />
		          <MenuItem value={60} primaryText="6" />
		          <MenuItem value={90} primaryText="9" />
		          <MenuItem value={120} primaryText="12" />
		          <MenuItem value={240} primaryText="24" />
		        </SelectField>
		        <div className="reward-protocol" onTouchTap={this.openRewardProtocol}>
		        	悬赏规则>>>
		        </div>
		        <Dialog
			          title="提示"
			          actions={actionButton}
			          modal={false}
			          open={this.state.open}
			          onRequestClose={this.handleClose}
			        	>
			          {this.state.openContent}
			    </Dialog>
		    </div>
		)
	}
}