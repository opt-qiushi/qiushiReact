import React, { Component } from 'react'
import "./introduction.css"

export default class Introduction extends Component{
	render(){
		const {person}=this.props
		var j=1,test,rows=[],answer;
          answer = person.detail.introduction.replace(/\r\n/ig,"/n");
          test = answer.split("/n");
          test.forEach(function(atomic){
            rows.push(
              <p key={j}>{atomic}</p>
            )
            j++;
          })
		return (
			<div className="box">
              <div className="boxtitle">个人介绍</div>
              <div className="introductionContent">{rows}</div>
            </div>
			)
	}
}