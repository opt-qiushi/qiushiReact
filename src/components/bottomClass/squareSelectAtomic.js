import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './squareAnswerAtomic.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import Draggable, {DraggableCore} from 'react-draggable' // Both at the same time
// import SquareAsian from './squareAsian'
import SquareAsian from '../../containers/squareAsian'


//广场问题
const circularStyle={
  textAlign: "center"
}

const bottomStyle={
  textAlign: "center",
  height:"50px",
  lineHeight:"50px"
}

var placeholder = document.createElement("li");
placeholder.className = "placeholder"


export default class SquareAnswerAtomic extends Component{
  constructor(props){
      super(props)
      this.state={
        word: "采纳"
      }
  }


    componentWillMount(){
      window.scrollTo(0,0)
    }

	render(){
    var rows=[]
    var i=1
    this.props.squareQuestion.forEach(function(squareAtomic){
         rows.push(
            <SquareAsian key={i} squareAtomic={squareAtomic} pageCategory={this.props.pageCategory} />
          )
        i++
    }.bind(this))
		return (
        <div>
           <div className="squareAnswerStructure" >
                  {rows}
           </div>
          
        </div>
			)
	}
}