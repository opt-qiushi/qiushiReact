import React, { Component } from 'react'
import './squareAnswerPool.css'
import SquareSelectAnswer from '../../containers/squareSelectPool'

export default class SquareSelectPool extends Component{
	constructor(props){
   	 super(props)
  	}


	render(){
    var rows= []; 
		return (
        <div>
          <div className="pool-head">赏金池</div>
          <div className="pool-head-desc">（被采纳的答案会被设定收费收听，并获得一定比例赏金）</div>
          <SquareSelectAnswer pageCategory={this.props.pageCategory}/>
        </div>
			)
	}
}