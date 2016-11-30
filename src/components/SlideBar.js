import React, { Component, PropTypes } from 'react'
import IconStyle from './bottomClass/IconStyle'
import * as colors from '../constants/color'
import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import './SlideBar.css'


class SlideBar extends Component {
	constructor(props) {
	    super(props)
	    this.handleClick=this.handleClick.bind(this)
	}

	handleClick(info){
		switch(info){
			case '求士':
				return this.props.onQiushi()
			case '关注':
				return this.props.onGuanzhu()
			case '动态':
				return this.props.onDongtai()
			case '我的':
				return this.props.onWode()
			default:
				return 0
		}
	}

	render(){
		const { value, onQiushi, onGuanzhu, onDongtai, onWode }=this.props
		return (
			<div className="slideBar" >
				<Link to="/qiushi/">
					<IconStyle imgUrl={value.iconInfo[0].img} colorInfo={value.iconInfo[0].color} title="求士" onTouch={this.handleClick} />
				</Link>
				<Link to="/guanzhu">
      				<IconStyle imgUrl={value.iconInfo[1].img} colorInfo={value.iconInfo[1].color} title="关注" onTouch={this.handleClick} />
      			</Link>
      			<Link to="/dongtai">
      				<IconStyle imgUrl={value.iconInfo[2].img} colorInfo={value.iconInfo[2].color}  title="动态" onTouch={this.handleClick} />
      			</Link>
      			<Link to="/wode">
      				<IconStyle imgUrl={value.iconInfo[3].img} colorInfo={value.iconInfo[3].color}  title="我的" onTouch={this.handleClick} />
      			</Link>
      		</div>
		)
	}
}

SlideBar.PropTypes = {
	value: PropTypes.object.isRequired,
	onQiushi: PropTypes.func.isRequired,
	onGuanzhu: PropTypes.func.isRequired,
	onDongtai: PropTypes.func.isRequired,
	onWode: PropTypes.func.isRequired
}

SlideBar.defaultProps = {
	value: { 
		visitFlag: 0,
		iconInfo: [
			{
				img: 'img/index-on.png',
				color: colors.OPTGREEN
			},
			{
				img: 'img/focus.png',
				color: colors.GRAYWHITE
			},
			{
				img: 'img/dynamic.png',
				color: colors.GRAYWHITE
			},
			{
				img: 'img/my.png',
				color: colors.GRAYWHITE
			}
		]
	} 
}

export default SlideBar