import React, { Component } from 'react'
import "./introduction.css"

export default class Introduction extends Component{
	render(){
		const {person}=this.props
		var j=1,test,rows=[],answer;
    if(person.detail.introduction){
      answer = person.detail.introduction.replace(/\r\n/ig,"/n");
      test = answer.split("/n");
      test.forEach(function(atomic){
        rows.push(
          <p key={j}>{atomic}</p>
        )
        j++;
      })
    }else{
      rows.push(
          <p>主人很懒，什么都没有留下</p>
      )
    }
    
		return (
			<div className="box">
              <div className="boxtitle">个人介绍</div>
              <div className="introductionContent">{rows}</div>
            </div>
			)
	}
}