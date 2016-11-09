import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider'
import { History } from 'react-router'
import GMTtoTime from './gmtToTime'
import io from '../../server'
import "./asklistComp.css"

const style={
	width: "100%",
	color: "black",
	height: "auto"
}

export default class AsklistComp extends Component{
	constructor(props){
		super(props)
		this.state = {isOpen:true,hasOpen:false}
		this.handleClick = this.handleClick.bind(this)
		this.handleStateChange = this.handleStateChange.bind(this)
	}


	handleClick(){
		if(!this.props.flag){
			this.props.onDialog()
			return 
		} 
		this.props.saveQuestionId(this.props.contentAtomic.id)
		setTimeout(function(){
			this.props.history.push("/questionDetail?id="+this.props.contentAtomic.id);
            // this.props.history.push("/questionDetail")
        }.bind(this),500)
	}
	handleStateChange(e){
        e.stopPropagation()
        var flag = this.state.isOpen;
        if(!flag){
        	this.refs.qiushiAnswer.style.maxHeight = 'none';
        }else{
        	this.refs.qiushiAnswer.style.maxHeight = 118 + 'px';
        }
        flag = !flag;
        this.setState({isOpen:flag})
    }
    componentDidMount(){
    	if(this.refs.qiushiAnswer.offsetHeight > 106){
    		this.refs.qiushiAnswer.style.maxHeight = 118 + 'px';
    		this.setState({isOpen:false,hasOpen:true})
    	}
    }
	render(){
		const {contentAtomic, answerRow}=this.props
		var openArea = [];
		if(this.state.hasOpen && !this.state.isOpen){
			openArea.length = 0;
			openArea.push(<img src="./img/向下箭头.png" key="down"/>)
		}else if(this.state.hasOpen && this.state.isOpen){
			openArea.length = 0;
			openArea.push(<img src="./img/向上箭头.png" key="up" />);
		}
		var fromAvatar = contentAtomic.from.avatar || contentAtomic.from.headimgurl || 'img/vipDetail/hosthead.png';
		var toAvatar = contentAtomic.to.avatar || contentAtomic.to.headimgurl || 'img/vipDetail/hosthead.png';
		return (
			<div>
			<FlatButton style={style} onTouchTap={this.handleClick} >
          		<div className="askercontainer">
                  <div className="askpersonImg">
                    <img src={fromAvatar} id="askpersonimg"/>
                  </div>
                  <div className="asker">
                    <div className="askername">{contentAtomic.from.name}</div>
                    <div className="askertime">{GMTtoTime(contentAtomic.createdAt)}</div>
                  </div>
                </div>
                <div className="qiushi-question">
                  Q：{contentAtomic.question}
                </div>
                <div className="askercontainer">
                  <div className="askpersonImg">
                    <img src={toAvatar} id="askpersonimg" />
                  </div>
                  <div className="asker">
                    <div className="askername">{contentAtomic.to.name}</div>
                  </div>
                </div>
                <div ref="qiushiAnswer" className="answer-container">
					{answerRow}
                </div>
	        </FlatButton>
            <div className="openArea" onTouchTap={this.handleStateChange}>
              	{openArea}
            </div>
            <Divider   />
            </div>
			)
	}
}