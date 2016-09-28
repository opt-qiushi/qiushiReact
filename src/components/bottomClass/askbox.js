import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Asklist from '../../containers/asklist'
import AsklistComp from './asklistComp'
import AsklistCompBinding from '../../containers/asklistCompBinding'
import io from '../../server'
import "./askbox.css"

export default class Askbox extends Component{
	constructor(props){
		super(props)
		this.state={
			informing: "加载更多",
			currentPage: 1,
			open: false
		}
		this.loadingMore=this.loadingMore.bind(this)
		this.handleClick=this.handleClick.bind(this)
		this.handleClose=this.handleClose.bind(this)
	}

	handleClick(){
		switch(this.state.open){
				case false:
					return this.setState({open: true})
				case true:
					return this.setState({open: false})
				default:
					return 
		}
	}

	handleClose(){
		this.setState({open: false});
	}
	

	loadingMore(){
		if(this.state.currentPage>=this.props.totalPages){
			return this.setState({informing: "没有更多内容了"})
		}
		else{
			var num=this.state.currentPage+1
			io.socket.post('/professional/getUserDetail', { from: this.props.userId, 
			      id: this.props.guestId, page: num}, (result, jwr) => {
			         this.props.loadingMoreQuestions(result)
			         return this.setState({currentPage: num})
			 })
		}
	}

	
	render(){
		const {content}=this.props
		const actionButton = [
		    <FlatButton
		        label="确定"
		        primary={true}
		        onTouchTap={this.handleClose} />
		    ];
		var rows=[]
		var i=1
		content.forEach(function(contentAtomic){
			var flag=1
			var answerRows = []
			var answerRows2 = []
			var j=1
	        var newAnswer = contentAtomic.answer;
	        if(this.props.ableToSee==0 && !newAnswer){
	        	answerRows2.push(
	        		<div key={i} className="askBoxer">
                        <div className="askItem">
                          <img src="./img/lock.png" alt="无法观看回答" />
                          <span>我要解锁他的回答</span>
                        </div>
                     </div>
	        		)
	        	flag = 0
	        }else{
	        	 if(!newAnswer){
	              return (<div></div>);
	         	 }
		          if(newAnswer.length && newAnswer.length > 50){
		              newAnswer = newAnswer.slice(0,50)
		              newAnswer = newAnswer + '...'
		          }
		          newAnswer = newAnswer.replace(/\n/g,"/n").replace(/\r/g,"/n")
		          var answerAtomic = newAnswer.split("/n")
		          answerAtomic[0] = "A:" + answerAtomic[0]
		          answerAtomic.forEach(function(atomic){
		            answerRows.push(
		              <div key={j}>{atomic}</div>
		            )
		            j++
		          })
		          answerRows2.push(<div key="j" className="answer">{answerRows}</div>)
	      	}
			rows.push(
				<AsklistCompBinding history={this.props.history} key={i} contentAtomic={contentAtomic} answerRow={answerRows2} flag={flag} onDialog={this.handleClick} />
				)
			i++
		}.bind(this))
		return (
			<div className="box">
              <div className="boxtitle">大家提问</div>
	              <div className="boxcontent" >
	              	{rows}
	              	<Dialog
			          title="解锁提示"
			          actions={actionButton}
			          modal={false}
			          open={this.state.open}
			          onRequestClose={this.handleClose}
			        >
			          提供一个优质问题，并被答主回答，即可解锁答主的所有问答内容
			        </Dialog>
	              </div>
              <div ref="clickopen" className="clickopen" onClick={this.loadingMore} >{this.state.informing}</div>
            </div>
			)
	}
}

Askbox.PropTypes={
		content: PropTypes.object.isRequired,
		flag: PropTypes.number.isRequired
	}

Askbox.defaultProps={
			flag: 0,
			content: [
				{
					from:{
						avatar:"",
						name:""
					},
					question: "",
					answer:""
				}
			]
		}