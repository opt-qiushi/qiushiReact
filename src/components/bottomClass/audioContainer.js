import React, { Component, PropTypes } from 'react';
export default class AudioContainer extends Component{
	constructor(props){
		super(props)
		this.start = this.start.bind(this)
    	this.stop = this.stop.bind(this)
	}
    start(){
	    alert('start')
	    this.refs.audio.play();
	    //this.refs.audio.duration
	 }
    stop(){
	    alert('stop')
	    this.refs.audio.pause();
	}
	render(){
		return(
			<div>
	            <audio src="http://qiushi-oss.oss-cn-hangzhou.aliyuncs.com/voices/id.mp3" ref="audio">
	              Don't support audio
	            </audio>
	            <span onTouchTap={this.start}>开始播放</span>
	            <span onTouchTap={this.stop}>暂停播放</span>
	        </div>
		)
	}
}