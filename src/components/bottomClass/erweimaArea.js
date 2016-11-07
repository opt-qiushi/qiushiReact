import React, { Component, PropTypes } from 'react';
import './erweima.css'
export default class ErWeiMaArea extends Component{
	constructor(props){
		super(props)
		this.state = {isHide:false}
		this.handleClose = this.handleClose.bind(this)
	}
	handleClose(){
		this.setState({isHide:true});
	}
	render(){
        if(!this.state.isHide){
          return (
          <div className="erweima-area">
          <img src="./img/弹框1.jpg" className="erweima-area-bg"/>
          <img className="erweima-area-right" src="./img/关闭.png" onClick={this.handleClose}/>
            {/*<div className="erweima-area-head">
                          <img className="erweima-area-right" src="./img/关闭.png" onClick={this.handleClose}/>
                        </div>
                        <div className="erweima-smile">
                          <img src="./img/笑脸.png"/>
                        </div>
                        <div className="erweima-area-body">
                          关注公众号<br/>
                          就能获得消息推送通知啦
                        </div>
                        <img src="./img/大二维码.jpg" className="erweima"/>*/}
          </div>)}else{
          return (<div></div>)
          }
    }
}
var ErWeiMaArea1 = React.createClass({
        getInitialState: function(){
          var flag = false;
          //if(localStorage.getItem("erweimaHide")){
            //flag = true;
          //}
          return {
            isHide: flag
          };
        },
        handleClose:function(){
          //localStorage.setItem("erweimaHide",true)
          this.setState({isHide:true});
        },
        render:function(){
          if(!this.state.isHide){
            return (
            <div className="erweima-area">
            <img src="./img/弹框1.jpg" className="erweima-area-bg"/>
            <img className="erweima-area-right" src="./img/关闭.png" onClick={this.handleClose}/>
              {/*<div className="erweima-area-head">
                              <img className="erweima-area-right" src="./img/关闭.png" onClick={this.handleClose}/>
                            </div>
                            <div className="erweima-smile">
                              <img src="./img/笑脸.png"/>
                            </div>
                            <div className="erweima-area-body">
                              关注公众号<br/>
                              就能获得消息推送通知啦
                            </div>
                            <img src="./img/大二维码.jpg" className="erweima"/>*/}
            </div>)}else{
            return (<div></div>)
            }
          
        }
      });