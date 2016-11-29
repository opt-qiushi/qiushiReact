import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import io from '../../server'


export default class GuanzhuAtomic extends Component{
	constructor(props){
		super(props)
		this.handleClick=this.handleClick.bind(this)
		this.headImg=this.headImg.bind(this)
	}

	handleClick(){
	         this.props.saveGuestId(this.props.focusPerson.id)
	         setTimeout(function(){
	         		this.props.history.push("/vipDetail?id="+this.props.focusPerson.id);
		        	// this.props.history.push("/vipDetail")
		     }.bind(this),500)
	}

	headImg(){
		if(this.props.focusPerson.avatar) return this.props.focusPerson.avatar
		else return this.props.focusPerson.headimgurl
	}


	render(){
		const {focusPerson}=this.props
		return (
			<div onTouchTap={this.handleClick}>
              <ListItem
                primaryText={focusPerson.name}
                secondaryText={focusPerson.title}
                leftAvatar={<Avatar src={this.headImg()} backgroundColor="white" />}  />
            </div>
			)
	}
}