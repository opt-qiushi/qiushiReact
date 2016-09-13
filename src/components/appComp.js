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
    console.log(userId)
    if(!userId) return
    io.socket.post('/professional/'+userId, {}, (result, jwr) => {
        console.log(result)
         this.props.getUserInformation(result)
    })
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