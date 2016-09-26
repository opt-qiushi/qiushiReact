import React, { Component } from 'react'
import Slider, { Item } from 'amazeui-react/lib/Slider'
import {Link} from 'react-router'
import './picSlider.css'

const picStyle={
	width:'100%'
}

export default class PicSlider extends Component{
	constructor(props){
		super(props)
		this.handleXueshu=this.handleXueshu.bind(this)
		this.handleShetuan=this.handleShetuan.bind(this)
		this.handleZheda=this.handleZheda.bind(this)
	}

	handleXueshu(){
		this.props.saveCategory('学术')
		setTimeout(function(){
            this.props.history.push("/category")
        }.bind(this),100)
	}

	handleShetuan(){
		this.props.saveCategory('社团')
		setTimeout(function(){
            this.props.history.push("/category")
        }.bind(this),100)
	}

	handleZheda(){
		setTimeout(function(){
            location.href='http://mp.weixin.qq.com/s?__biz=MzAwMTcwMzY5Mw==&mid=2652611509&idx=1&sn=319883d7d039b169f821c197e480f4a3&scene=1&srcid=0909FvNU1XTULaB7msLkOvSR&from=groupmessage&isappinstalled=0#wechat_redirect'
        }.bind(this),100)
	}


	render(){
		return (
			<Slider slideSpeed={2000} className="picSlider" style={picStyle}>
			    <Item>
			      <img
			        src="img/1xuanzhuanye.jpg" onClick={this.handleXueshu} />
			    </Item>
			    <Item><img
			      src="img/2shetuan.jpg" onClick={this.handleShetuan} /></Item>
			    <Item>
			      <img
			        src="img/3zheda.jpg" onClick={this.handleZheda} /></Item>
			    <Item>
			      <img
			        src="img/4ruzhu.jpg"/></Item>
			  </Slider>
			)
	}
}