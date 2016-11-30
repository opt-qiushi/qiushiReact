import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './squareAnswerPool.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
import SquareAnswerAtomic from '../../containers/squareAnswerAtomic'
//广场问题
const FlatButtonStyle = {
  
}
export default class SquareAnswerPool extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    
  }

	render(){
    var rows= []; 
		return (
        <div>
          <div className="pool-head">回答池</div>
          <div className="pool-head-desc">（被采纳的答案会被设定收费收听，并获得一定比例赏金）</div>
          <SquareAnswerAtomic pageCategory={this.props.pageCategory}/>
        </div>
			)
	}
}