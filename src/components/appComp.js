import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import SlideBar from './SlideBar'
import cookie from 'react-cookie'
import io from '../server'

const currentStyle={
  height:"100%"
}

const bottomStyle={
  height:"49px"
}

export default class AppComp extends Component{
  componentWillMount(){
    var userId=cookie.load('userId')
    var guestId=cookie.load('guestId')
    var questionId=cookie.load('questionId')
    if(!userId) {
      // location.href="http://www.opt.com.cn/chat1";
      return 
    }
    io.socket.post('/professional/'+userId, {}, (result, jwr) => {
         this.props.getUserInformation(result)
    })
    if(guestId){
      this.props.saveGuestId(guestId)
    }
    if(questionId){
      this.props.saveQuestionId(questionId)
    }
    // io.socket.post('/config/', {}, (result, jwr) => {    
    //   console.log(result)          
    //   sessionStorage.setItem("config",result);
    // })
  }

  render() {
    const {status, changeQiushi,changeGuanzhu,changeDongtai,changeWode, notShouye} = this.props
    var rows=[]
    if(status.isHome){
      rows.push(<SlideBar key="1" value={status}
           onQiushi={changeQiushi}
           onGuanzhu={changeGuanzhu}
           onDongtai={changeDongtai}
           onWode={changeWode} />)
    }
    return (
      <div style={currentStyle}>
        {rows}
        {this.props.children}
        <div style={bottomStyle}></div>
      </div>
    )
  }
}