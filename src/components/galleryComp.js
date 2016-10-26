import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import "./galleryComp.css"
import io from '../server'

export default class GalleryComp extends Component{
  constructor(props) {
      super(props)
      this.state = {isFocus:this.props.theOne.likeFlag}
      this.handleClick=this.handleClick.bind(this)
      this.showAvatar=this.showAvatar.bind(this)
      this.handleFocus=this.handleFocus.bind(this)
  }

  handleClick(){
      this.props.saveGuestId(this.props.theOne.id)
  }

  showAvatar(){
      if(this.props.theOne.avatar) return this.props.theOne.avatar
      else return this.props.theOne.headimgurl
  }
  handleFocus(e){
      e.preventDefault();
      e.stopPropagation();
      if(!this.state.isFocus){
        var apiFlag = 1;
      }else{
        var apiFlag = 0;
      }
      io.socket.get('/professional/follow', {from:this.props.userInfo.id, to:this.props.theOne.id, flag:apiFlag }, (result, jwr) => {
        var flag = this.state.isFocus;
        flag = !flag;
        this.setState({isFocus:flag});
        io.socket.get('/professional/getHomeUsers', {id:localStorage.getItem('userId')}, (result, jwr) => {
          this.props.galleryUpdate(result)
        })
      });
      // if(!this.state.isFocus){
      //   io.socket.get('/professional/follow', {from:this.props.userInfo.id, to:this.props.theOne.id, flag:1 }, (result, jwr) => {
      //     var flag = this.state.isFocus;
      //     flag = !flag;
      //     this.setState({isFocus:flag});
      //     io.socket.get('/professional/getHomeUsers', {id:localStorage.getItem('userId')}, (result, jwr) => {
      //       this.props.galleryUpdate(result)
      //     })
      //   });
      // }
      // else{
      //   io.socket.get('/professional/follow', {from:this.props.userInfo.id, to:this.props.theOne.id, flag:0 }, (result, jwr) => {
      //     var flag = this.state.isFocus;
      //     flag = !flag;
      //     this.setState({isFocus:flag});
      //     io.socket.get('/professional/getHomeUsers', {id:localStorage.getItem('userId')}, (result, jwr) => {
      //       this.props.galleryUpdate(result)
      //     })
      //   });
      // }
  }
  render(){
    const {theOne} = this.props
    var likeFlag = theOne.likeFlag || 0;
    // this.setState(isFocus:likeFlag)
    // console.log(this.state.isFocus)
    var intro = ""
    if(theOne.intro){
      intro = theOne.intro.substr(3)
    }
    var tag = "";
    if(theOne.tags){
      tag = theOne.tags[0];
    }
    var focusArea = [];
    if(this.state.isFocus){
      focusArea.push(<span className="gallery-focusbtn" onClick={this.handleFocus} key="1">已关注</span>)
    }else{
      focusArea.push(<span className="gallery-focusbtn" onClick={this.handleFocus} key="0">+ 关注</span>)
    }
    //为了实现分享功能添加的参数字符串
    var targetUrl = "/vipDetail?id=" + theOne.id;
    return (  
              <Link to={targetUrl}>
                <div className="gallery" onClick={this.handleClick}>
                  <img id="gallery_img" src={this.showAvatar()} />
                  {/*<div className="nameTag">
                                        <div className="name">{theOne.name}</div>
                                        <div className="tag">
                                          <img src="./img/tag-home.png" />{theOne.title}
                                        </div>
                                      </div>*/}
                  <div className="scrollPage">{intro}</div>
                </div>
                <div className="gallery-detail">
                  <div className="gallery-tag">{tag}</div>
                  <div className="gallery-fans">
                    {theOne.fansNum} 关注
                  </div>
                  <div className="gallery-answerNum">
                    {theOne.answerNum} 回答
                  </div>
                  {focusArea}
                </div>
                <div className="gallery-placeholder"></div>
              </Link>
      )
  }
}
