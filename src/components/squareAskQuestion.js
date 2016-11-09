import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
const rightSelectStyle = {
	width: "30%",
	float: "right"
}
export default class SquareAskQuestion extends Component{
	constructor(props){
		super(props)
		this.state = {value1:1,value2:3}
	}

	handleChange1 = (event, index, value1) => this.setState({value1});
	handleChange2 = (event, index, value2) => this.setState({value2});
	/*handleChange1(event, index, value1){
		this.setState(value1)
	}
	handleChange2(event, index, value2){
		this.setState(value2)
	}*/
	render(){
		return(
			<div className="square-ask-question">
				<div><FlatButton backgroundColor="#0A964C"
      			hoverColor="#999999" label="发送" labelStyle={labelStyle} style={btnStyle}/></div>
				<TextField
				  floatingLabelText="请输入你的问题"
			      hintText=""
			      multiLine={true}
			      rows={6}
			      rowsMax={6}
			      fullWidth={true}
			    /><br />
			    <SelectField
		          floatingLabelText="悬赏积分"
		          value={this.state.value1}
		          onChange={this.handleChange1}
		          style={selectStyle}
		        >
		          <MenuItem value={1} primaryText="100" />
		          <MenuItem value={2} primaryText="200" />
		          <MenuItem value={3} primaryText="300" />
		          <MenuItem value={4} primaryText="400" />
		          <MenuItem value={5} primaryText="500" />
		        </SelectField>
		        <SelectField
		          floatingLabelText="回答时限"
		          value={this.state.value2}
		          onChange={this.handleChange2}
		          style={rightSelectStyle}
		          menuStyle={menuStyle}
		        >
		          <MenuItem value={3} primaryText="3" />
		          <MenuItem value={6} primaryText="6" />
		          <MenuItem value={9} primaryText="9" />
		          <MenuItem value={12} primaryText="12" />
		          <MenuItem value={24} primaryText="24" />
		        </SelectField>
		    </div>
		)
	}
}