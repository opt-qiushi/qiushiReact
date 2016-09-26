import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'
import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
// import CommunicationChatBubble from 'material-ui/svg-icons/navigation/arrow-forward'
import './userCenterComp.css'
import io from '../server'

const style={
	height:"100%",
	minWidth:"10px",
	width:"25%",
	float:"left",
	borderLeftStyle:"solid",
	borderLeftColor:"#dddddd",
	borderLeftWidth:"1px",
	borderBottomStyle:"solid",
	borderBottomColor:"#dddddd",
	borderBottomWidth:"1px",
	borderRadius:"0px"
}

const style2={
	height:"100%",
	minWidth:"10px",
	width:"25%",
	float:"left",
	borderStyle:"solid",
	borderColor:"#dddddd",
	borderWidth:"1px"
}

const listStyle={
	backgroundColor:"white"
}

export default class UserCenterComp extends Component{
    constructor(props){
        super(props)
        this.myAnswer=this.myAnswer.bind(this)
        this.myQuestion=this.myQuestion.bind(this)
        this.myFocus=this.myFocus.bind(this)
        this.myInformation=this.myInformation.bind(this)
        this.myFeedback=this.myFeedback.bind(this)
        this.handlePersonalDetail=this.handlePersonalDetail.bind(this)
    }

    componentWillMount(){
        this.props.changeWode()
        this.props.shouye()
        window.scrollTo(0,0)
        io.socket.post('/professional/'+this.props.userInfo.id,{},(result, jwr) => {
              this.props.getUserInformation(result)
        })
    }

    myAnswer(){
        setTimeout(function(){
            this.props.history.push("/myAnswer")
        }.bind(this),500)
    }

    myQuestion(){
        setTimeout(function(){
            this.props.history.push("/myQuestion")
        }.bind(this),500)
    }

    myInformation(){
        setTimeout(function(){
            this.props.history.push("/myInformation")
        }.bind(this),500)
    }

    myFocus(){
        setTimeout(function(){
            this.props.history.push("/guanzhu")
        }.bind(this),500)
    }

    myFeedback(){
        setTimeout(function(){
            this.props.history.push("/myFeedback")
        }.bind(this),500)
    }

    handlePersonalDetail(){
        this.props.saveGuestId(this.props.userInfo.id)
        setTimeout(function(){
            this.props.history.push("/vipDetail")
        }.bind(this),100)
    }

	render(){
		const {userInfo}=this.props
		return (
			<div className="my-detail">
              <div className="my-head">
                <div className="my-head-avatar" onClick={this.handlePersonalDetail} >
                  <img src={userInfo.headimgurl} />
                </div>
                <p>{userInfo.name}</p>
              </div>
              <div className="tab-bar">
                <FlatButton style={style} className="tab-bar-0" onTouchTap={this.myFocus} ><div className="tab-bar-0-0">{userInfo.focusNum}</div><p>关注</p></FlatButton>
                <FlatButton style={style} className="tab-bar-0" ><div className="tab-bar-0-0">{userInfo.fansNum}</div><p>粉丝</p></FlatButton>
                <FlatButton style={style} className="tab-bar-0" onTouchTap={this.myAnswer} ><div className="tab-bar-0-0">{userInfo.answerNum}</div><p>回答</p></FlatButton>
                <FlatButton style={style} className="tab-bar-0" onTouchTap={this.myQuestion} ><div className="tab-bar-0-0">{userInfo.questionNum}</div><p>提问</p></FlatButton>
              </div>
              <List>
                <ListItem
                    primaryText="修改信息"
                    leftAvatar={<Avatar src="img/my-personal.png" backgroundColor="white" />}
                     onTouchTap={this.myInformation} />
                <Divider />
        		<ListItem
        			primaryText="我的提问"
        			leftAvatar={<Avatar src="img/my-proposal.png" backgroundColor="white" />}
        			 onTouchTap={this.myQuestion} />
        		<Divider />
        		<ListItem
        			primaryText="我的回答"
        			leftAvatar={<Avatar src="img/my-answer.png" backgroundColor="white" />}
        			 onTouchTap={this.myAnswer} />
        		<Divider />
                <ListItem
                    primaryText="我要反馈"
                    leftAvatar={<Avatar src="img/my-feedback.png" backgroundColor="white" />}
                     onTouchTap={this.myFeedback} />
                <Divider />
    			</List>
            </div>
            )
	}
}