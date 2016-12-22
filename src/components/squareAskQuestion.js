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
	color: "white",
	verticalAlign: "baseline",
	fontSize:"15px"
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
		if(content.length<5){
			this.setState({open:true,openContent:'抱歉，问题字数小于五个字'})
		}else if(content.length>1000){
			this.setState({open:true,openContent:'抱歉，问题字数超出一千字'})
		}else{
			io.socket.post("/squareQuestion", {from:userId,question:content,reward:this.state.value1,duration:this.state.value2},(result,jwr)=>{
				if(result.data === "success"){
					this.setState({open:true,openContent:'提问成功',isRedirect:true})
				}else{
					this.setState({open:true,openContent:'网络错误，请重试'})
				}
			})
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
		var row = <div><div>1、提出问题，支付赏金后，选择问答时长，等待其他答主开始抢答。</div>
		<div>2、答案征集结束后，你可以选中三个最满意的回答，答主们平分赏金，并在后续共同分享解锁收益。</div>
		<div>3、若答案征集结束后，答案数低于3个时，你可以申请删除问题，并全额退款。</div>
		<div>4、若答案征集结束后，你未选择满意的回答，则所有参与抢答的答主平分赏金。</div>
		</div>;
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
	      			hoverColor="#999999" label="发 布" labelStyle={labelStyle} style={btnStyle} onClick={this.handleSendQuestion}/>
      			</div>
				<TextField
				  floatingLabelText="请输入你的问题"
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
		          <MenuItem value={30} primaryText="3 h" />
		          <MenuItem value={60} primaryText="6 h" />
		          <MenuItem value={90} primaryText="9 h" />
		          <MenuItem value={120} primaryText="12 h" />
		          <MenuItem value={240} primaryText="24 h" />
		        </SelectField>
		        <div className="reward-protocol" onTouchTap={this.openRewardProtocol}>
		        	悬赏规则 >
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