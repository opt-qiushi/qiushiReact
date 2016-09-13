import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './IconStyle.css';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

const buttonStyle={
	paddingTop: '8px',
	height: '100%',
	width: '25%',
	minWidth: '10px',
	display: 'inline',
	float: 'left',
	textAlign: 'center',
	lineHeight: '12px',
	textDecoration: 'none',
	left: 0
}

class IconStyle extends Component{
	constructor(props) {
	    super(props)
	    this.handleClick=this.handleClick.bind(this)
	}
	handleClick(){
		this.props.onTouch(this.props.title)
	}
	render(){
		const {imgUrl, colorInfo, title, onTouch} = this.props
		return (
				<FlatButton className="iconStyle" style={buttonStyle} onClick={this.handleClick}>
			      	<div><img src = {imgUrl} /></div>
			      	<font className="categoryWord" color={colorInfo}>{title}</font>
	      		</FlatButton>
			)
	}
}

IconStyle.PropTypes={
	imgUrl: PropTypes.string.isRequired,
	colorInfo: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onTouch: PropTypes.func.isRequired
}

export default IconStyle