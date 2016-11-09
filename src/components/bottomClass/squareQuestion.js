import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './squareQuestion.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
//广场问题
const FlatButtonStyle = {
  
}
export default class SquareQuestion extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    
  }

	render(){
    var rows= [];
    if(this.props.readyAsk){
      rows.push(<div className="square-answer-line" key="1"><FlatButton style={FlatButtonStyle} hoverColor="#0A964C" rippleColor="#0A964C" backgroundColor="#0A964C" labelStyle={{color:"white"}} label="立即回答" /></div>)
    }
    // var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || ""; 
		return (
			<div  ref="duihuakuang" className="squareStructure" >
                <div className="squareHead">
                    <span className="squareHeadAvatar" >
                      <img src="./img/empty.png"  />
                    </span>
                    <span className="squareHead-1-0">
                      一只椰子
                    </span>
                    <span className="squareHead-1-1">
                      剩余20分钟
                    </span>
                    <br/>
                    <span className="squareHead-2-0">
                      赏金5元
                    </span>
                    <span className="squareHead-1-1">
                      0回答
                    </span>
                </div>
                <div className="squareBody">
                  <p className="square-question">
                    Q：如何看待高考是唯一的出路？
                  </p>
                </div>
                {rows}
                <div className="squareEnd"></div>
            </div>
			)
	}
}