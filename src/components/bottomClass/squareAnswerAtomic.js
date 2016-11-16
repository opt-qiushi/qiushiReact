import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './squareAnswerAtomic.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
//广场问题

export default class SquareAnswerAtomic extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    
  }

	render(){
    var rows= []; 
		return (
        <div>
          <div className="squareAnswerStructure" >
                <div className="squareAnswerHead">
                    <span className="squareAnswerHeadAvatar" >
                      <img src="./img/empty.png"  />
                    </span>
                    <span className="squareAnswerHead-1-0">
                      一只椰子
                    </span>
                    <span className="squareAnswerHead-1-1">
                      采纳
                    </span>
                    <br/>
                    <span className="squareAnswerHead-2-0">
                      2016-11-11
                    </span>
                    
                </div>
                <div className="squareAnswerBody">
                  <p className="squareAnswer-question">
                    A：我的
                  </p>
                </div>
                <div className="squareAnswerEnd"></div>
            </div>
        </div>
			)
	}
}