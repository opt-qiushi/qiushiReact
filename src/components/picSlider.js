import React, { Component } from 'react'
import Slider, { Item } from 'amazeui-react/lib/Slider'
import './picSlider.css'

const picStyle={
	width:'100%',
	height: '140px'
}

export default class PicSlider extends Component{


	render(){
		return (
			<Slider slideSpeed={2000} className="picSlider" style={picStyle}>
			    <Item>
			      <img
			        src="img/1xuanzhuanye.jpg"/>
			    </Item>
			    <Item><img
			      src="img/2shetuan.jpg"/></Item>
			    <Item>
			      <img
			        src="img/3zheda.jpg"/></Item>
			    <Item>
			      <img
			        src="img/4ruzhu.jpg"/></Item>
			  </Slider>
			)
	}
}