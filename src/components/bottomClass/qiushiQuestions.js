import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import "./qiushiQuestions.css"

export default class QiushiQuestions extends Component{
	constructor(props) {
	    super(props)
	    this.state={
	    	num: 3,
	    	buttonStatus: "点击展开"
	    }
	    this.showQuestions=this.showQuestions.bind(this)
	    this.handleClick=this.handleClick.bind(this)
	}

	showQuestions(){
		var rows=[]
		for(var i=0;i<this.state.num;i++){
			var temp=this.props.content[i]
			var rows2=[]
			var j=1
            var answer = temp.answer.replace(/\r\n/ig,"/n")
            var test = answer.split("/n");
            test[0] = "答:" + test[0]
            test.forEach(function(atomic){
              rows2.push(
                <p key={j}>{atomic}</p>
              )
              j++;
            })
			rows.push(
				<div key={i}>
                  <div className="question">
                    <div>{i+1} {temp.question}</div>
                  </div>
                  <div className="answer">{rows2}</div>
                </div>
			)
		}
		return rows
	}

	handleClick(){
		switch(this.state.buttonStatus){
			case "点击展开":
				return this.setState({num: this.props.content.length, buttonStatus: "点击收起"})
			case "点击收起":
				return this.setState({num: 3, buttonStatus: "点击展开"})
			default:
				return
		}
	}

	render(){
		return (
			<div className="box">
              <div className="boxtitle" id="tenQuestion">求士十问</div>
                <div className="boxcontent">
                  {this.showQuestions()}
                </div>
              <div ref="clickopen" className="clickopen" onClick={this.handleClick} >{this.state.buttonStatus}</div>
            </div>
			)
	}
}