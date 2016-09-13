import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import "./galleryComp.css"


export default class GalleryComp extends Component{
  constructor(props) {
      super(props)
      this.handleClick=this.handleClick.bind(this)
      this.showAvatar=this.showAvatar.bind(this)
  }

  handleClick(){
      this.props.saveGuestId(this.props.theOne.id)
  }

  showAvatar(){
      if(this.props.theOne.avatar) return this.props.theOne.avatar
      else return this.props.theOne.headimgurl
  }

  render(){
    const {theOne} = this.props
    return (  
              <Link to="/vipDetail">
                <div className="gallery" onClick={this.handleClick}>
                    <img id="gallery_img" src={this.showAvatar()} />
                    <div className="nameTag">
                      <div className="name">{theOne.name}</div>
                      <div className="tag">
                        <img src="img/tag-home.png" />{theOne.title}
                      </div>
                    </div>
                    <div className="scrollPage"></div>
                </div>
              </Link>
      )
  }
}
