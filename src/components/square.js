import React, { Component } from 'react'
import './square.css'
import io from '../server'
import FlatButton from 'material-ui/FlatButton'
import SquareQuestion from './bottomClass/squareQuestion'
//广场
const FlatButtonStyle = {
  
}
export default class Square extends Component{
  constructor(props){
    super(props)
    this.askQuestion = this.askQuestion.bind(this)
  }

  componentDidMount(){
    
  }
  askQuestion(){
    
  }
	render(){
		var rows=[];
    // var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || ""; 
		return (
			<div >
        <SquareQuestion/>
        <FlatButton label="立即提问" onTouchTap={this.askQuestion}/>
      </div>
			)
	}
}