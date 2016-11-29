import React, { Component } from 'react'
import './square.css'
import io from '../server'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/FlatButton'
import SquareQuestion from './bottomClass/squareQuestion'
import CircularProgress from 'material-ui/CircularProgress'
import {Tabs, Tab} from 'material-ui/Tabs'
//广场
const FlatButtonStyle = {
  
}

const allStyle={
  tabStyle: {
    backgroundColor: 'white'
  },
  tabButtonStyle:{
    color:"black"
  },
  inkBarStyle:{
    backgroundColor: '#0A964C'
  },
  circularStyle:{
    textAlign:"center",
    marginTop:"100px"
  }
}

const circularStyle={
  textAlign: "center"
}

const style = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
}

const bottomStyle={
  textAlign: "center",
  height:"50px",
  lineHeight:"50px"
}



export default class Square extends Component{
  constructor(props){
    super(props)
    this.askQuestion = this.askQuestion.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
    this.state={
      isInfiniteLoading: false,
      isLoading: false,
      toBottom: false,
      page: 1,
      totalPages: 1,
      stage: 2,
      loading: true
    }
    this.handleScrollToBottom=this.handleScrollToBottom.bind(this)
    this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
    this.showLoading=this.showLoading.bind(this)
    this.handleScroll=this.handleScroll.bind(this)
    this.showSolved=this.showSolved.bind(this)
    this.showSolving=this.showSolving.bind(this)
    this.showList=this.showList.bind(this)
    this.loading=this.loading.bind(this)
  }

  showLoading(){
    if(this.state.toBottom){
      setTimeout(function() {
          this.setState({toBottom: false})
      }.bind(this), 2000)
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
        if(this.state.page > this.state.totalPages){
          this.setState({isInfiniteLoading: false, isLoading: false,toBottom: true})
          return 
        }
        io.socket.get('/allSquareQuest', {page: this.state.page, state: this.state.stage}, (result, jwr) => {
          setTimeout(function() {
            this.props.addSquare(result.questionList)
            this.setState({isInfiniteLoading: false, isLoading: false,toBottom: false, page: this.state.page+1, totalPages:result.totalPages})
          }.bind(this), 1000)
        })
  }

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }


  componentDidMount(){
    io.socket.get("/allSquareQuest",{state:this.state.stage},(result,jwr)=>{
      this.props.applySquare(result.questionList)
      this.setState({totalPages:result.totalPages, page: this.state.page+1, loading: false})
    })
    window.addEventListener('scroll', this.handleScroll)
  }
  askQuestion(){
    location.href = "./squareAskQuestion"
  }

  showSolved(){
    this.setState({stage: 2, page:1, totalPages:1, loading: true})
    io.socket.get("/allSquareQuest",{state:2},(result,jwr)=>{
      this.props.applySquare(result.questionList)
      this.setState({totalPages:result.totalPages, page: this.state.page+1, loading: false})
    })
  }

  showSolving(){
    this.setState({stage: 0, page:1, totalPages:1, loading: true})
    io.socket.get("/allSquareQuest",{state:0},(result,jwr)=>{
      this.props.applySquare(result.questionList)
      this.setState({totalPages:result.totalPages, page: this.state.page+1, loading: false})
    })
  }

  handleQuestion(data){
    this.props.changeCurrentSquare(data)
    // location.href="./squareQuestionDetail"
    this.props.history.push("/squareQuestionDetail")
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  showList(){
    var rows=[]
    var i=1
    this.props.squareQuestion.forEach(function(squareAtomic){
      if(squareAtomic.flag) return 
      rows.push(
        <SquareQuestion key={i} readyAsk="1" squareQuestion={squareAtomic} onChange={this.handleQuestion} history={this.props.history} />
        )
      i++
    }.bind(this))

    return rows
  }

  loading(){
    switch(this.state.loading){
      case false:
            return
      case true:
            return <div style={allStyle.circularStyle}><CircularProgress size={0.8} /></div>
      default: 
            return

    }
  }

	render(){
    const {squareQuestion}=this.props

    // var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || ""; 
		return (
			<div >
        <div className="askButtonPlaceholder"></div>
    {/*<Paper key={i} style={style} zDepth={2} children={<SquareQuestion readyAsk="1" history={this.props.history} questions={messageAtomic} />} />*/}
        <Tabs tabItemContainerStyle={allStyle.tabStyle} inkBarStyle={allStyle.inkBarStyle} >
          <Tab label="已解答" style={allStyle.tabButtonStyle} onActive={this.showSolved} >
            {this.loading()}
            {this.showList()}
            
          </Tab>
          <Tab label="进行中" style={allStyle.tabButtonStyle} onActive={this.showSolving} >
            {this.loading()}
            {this.showList()}
            
          </Tab>
        </Tabs>
        {this.showLoading()}
        <div className="squareToAskQuestion" onTouchTap={this.askQuestion}><span className="squareToAskQuestion-inner">立即提问</span></div>
      </div>
			)
	}
}