import React, { Component } from 'react'
import Button from 'amazeui-react/lib/Button'
import "./personBack.css"
import io from '../../server'

const buttonStyle1={
  backgroundColor: "white",
  borderColor: "#666666",
  borderWidth: "1px",
  borderStyle: "solid",
  color: "#666666"
}

const buttonStyle2={
  backgroundColor: "#666666",
  color: "white"
}

export default class PersonBack extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
    this.showFollowButton=this.showFollowButton.bind(this)
    this.showAvatar=this.showAvatar.bind(this)
  }

  handleClick(event){
    switch(this.props.person.like){
      case 0:
            io.socket.get('/professional/follow', {from:this.props.userId, to:this.props.person.detail.id, flag:1 }, (result, jwr) => {
              io.socket.post('/professional/getUserDetail', { from: this.props.userId, 
                  id: this.props.person.detail.id }, (result, jwr) => {
                     this.props.getCurrentDetail(result)
               })
            });
            break
      case 1:
            io.socket.get('/professional/follow', {from:this.props.userId, to:this.props.person.detail.id, flag:0 }, (result, jwr) => {
              io.socket.post('/professional/getUserDetail', { from: this.props.userId, 
                  id: this.props.person.detail.id }, (result, jwr) => {
                     this.props.getCurrentDetail(result)
               })
            });
            break
      default:
            return
    }
  }

  showFollowButton(){
    switch(this.props.person.like){
      case 0:
            if(this.props.userId==this.props.person.detail.id) return
            else return (<Button style={buttonStyle1} round onTouchTap={this.handleClick}>+关注</Button>)
      case 1:
            if(this.props.userId==this.props.person.detail.id) return
            else return (<Button style={buttonStyle2} round onTouchTap={this.handleClick}>已关注</Button>)
      default:
            return 
    }
  }

  showAvatar(){
    if(this.props.person.detail.avatar) return this.props.person.detail.avatar
      else return this.props.person.detail.headimgurl
  }

	render(){
		const {person}=this.props
		return (
		 	 <div className="personback">
                <div className="backgroundImg">
                  <img src="img/vipDetail/topBackground.jpg" id="backimg" className="headimg"/>               
                   </div>
                <div className="personbackinfo">
                  <div className="headAvatar">
                    <img src={this.showAvatar()} id="headimg" />
                  </div>
                  <div id="hostname">{person.detail.name}</div>
                  <div className="answernum_followernum">
                    已回答 {person.detail.answerNum}  丨  粉丝 {person.detail.fansNum}
                  </div>
                  {this.showFollowButton()}
                  <div className="tag">
                    <img src="img/vipDetail/tag.png" id="tagimg" />
                    {person.detail.title}
                  </div>
                </div>
              </div>
		)
	}
}