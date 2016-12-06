import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './squareAnswerAtomic.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import Draggable, {DraggableCore} from 'react-draggable' // Both at the same time
import SquareAfrica from '../../containers/squareAfrica'
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
        isInfiniteLoading: false,
        isLoading: false,
        toBottom: false,
        page: 1,
        totalPages: 1,
        word: "采纳",
      }
      this.handleScrollToBottom=this.handleScrollToBottom.bind(this)
      this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
      this.showLoading=this.showLoading.bind(this)
      this.handleScroll=this.handleScroll.bind(this)
      this.showList=this.showList.bind(this)
      this.addAdoptNum=this.addAdoptNum.bind(this)
      this.minusAdoptNum=this.minusAdoptNum.bind(this)
  }
    addAdoptNum(){
      var temp=this.state.adoptNum+1
      this.setState({adoptNum: temp})
    }

    minusAdoptNum(){
      var temp=this.state.adoptNum-1
      this.setState({adoptNum: temp})
    }


  showLoading(){
      if(this.state.toBottom){
        setTimeout(function() {
            this.setState({toBottom: false})
        }.bind(this), 500)
        return <div style={bottomStyle}>已无更多内容</div>
      }
      if(this.state.isInfiniteLoading) return this.elementInfiniteLoad()
        else return 
    }

  handleScroll(){
      var scrollviewOffsetY = document.body.scrollTop
      var scrollviewFrameHeight = document.body.clientHeight
      var scrollviewContentHeight = document.body.scrollHeight - 300;

      var sum = scrollviewOffsetY+scrollviewFrameHeight
      if(sum >= scrollviewContentHeight && !this.state.isLoading){
        return this.handleScrollToBottom()
      }
      return 
    }

    handleScrollToBottom(){
          this.setState({
              isInfiniteLoading: true,
              isLoading: true
          })
          if(this.state.page >= this.state.totalPages){
            this.setState({isInfiniteLoading: false, isLoading: false,toBottom: true})
            return 
          }
          io.socket.get('/squareQuest?questId='+this.props.squareQuestion.defaultData.id+'&page='+this.state.page, {}, (result, jwr) => {
          setTimeout(function() {
            this.props.addCurrentSquare(result.question.answer)
            this.setState({isInfiniteLoading: false, isLoading: false,toBottom: false, page: this.state.page+1, totalPages:result.totalPages})
          }.bind(this), 2000)
        })
    }

    elementInfiniteLoad(){
        return <div style={circularStyle}><CircularProgress size={0.5} /></div>
      }

    componentWillMount(){
      window.scrollTo(0,0)
    }

    componentDidMount(){
      window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    }

    showList(){
      var rows=[]
      var i=1
      this.props.squareQuestion.defaultData.answer.forEach(function(squareAtomic){
         rows.push(
            <SquareAfrica key={i} squareAtomic={squareAtomic}   pageCategory={this.props.pageCategory}/>
          )
        i++
      }.bind(this))
      return rows
    }

	render(){
    
		return (
        <div>
           <div className="squareAnswerStructure" >
                  {this.showList()}
                  {this.showLoading()}
           </div>
          
        </div>
			)
	}
}