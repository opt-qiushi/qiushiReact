import React, { Component } from 'react'
import './square.css'
import io from '../server'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/FlatButton'
import SquareQuestion from './bottomClass/squareQuestion'
import CircularProgress from 'material-ui/CircularProgress'
import {Tabs, Tab} from 'material-ui/Tabs'
import Dialog from 'material-ui/Dialog'
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
      isLoading: true,
      toBottom: false,
      page: 1,
      totalPages: 5,
      stage: 0,
      openContent:'',
      open:false
    }
    this.handleScrollToBottom=this.handleScrollToBottom.bind(this)
    this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
    this.showLoading=this.showLoading.bind(this)
    this.handleScroll=this.handleScroll.bind(this)
    this.showSolved=this.showSolved.bind(this)
    this.showSolving=this.showSolving.bind(this)
    this.showList=this.showList.bind(this)
    this.loading=this.loading.bind(this)
    this.openRewardProtocol=this.openRewardProtocol.bind(this)
    this.handleClose=this.handleClose.bind(this)
  }
  handleClose(){
    this.setState({open:false})
    
  }
  openRewardProtocol(){
    var row = <div><div>1、提出问题，支付赏金后，选择问答时长，等待其他答主开始抢答。</div>
    <div>2、答案征集结束后，你可以选中三个最满意的回答，答主们平分赏金，并在后续共同分享解锁收益。</div>
    <div>3、若答案征集结束后，答案数低于3个时，你可以申请删除问题，并全额退款。</div>
    <div>4、若答案征集结束后，你未选择满意的回答，则所有参与抢答的答主平分赏金。</div>
    </div>;
    this.setState({open:true,openContent:row})
  }
  showLoading(){
    if(this.state.toBottom){
      setTimeout(function() {
          this.setState({toBottom: false})
          window.removeEventListener('scroll', this.handleScroll)
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
        if(this.state.page > this.state.totalPages ){
          this.setState({isInfiniteLoading: false, isLoading: false,toBottom: true})
          return 
        }
        io.socket.get('/allSquareQuest', {page: this.state.page, state: this.state.stage}, (result, jwr) => {
          setTimeout(function() {
            if(result.totalPages==1){
              this.setState({isInfiniteLoading: false, isLoading: false,toBottom: true})
              return
            }
            this.props.addSquare(result.questionList)
            this.setState({isInfiniteLoading: false, isLoading: false,toBottom: false, page: this.state.page+1, totalPages:result.totalPages})
          }.bind(this), 500)
        })
  }

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }
  componentDidMount(){
    io.socket.get("/allSquareQuest",{state:this.state.stage},(result,jwr)=>{
      this.props.applySquare(result.questionList)
      this.setState({totalPages:result.totalPages, page: this.state.page+1, isLoading: false})
    })
    window.addEventListener('scroll', this.handleScroll)
  }
  askQuestion(){
    this.props.history.push("/squareAskQuestion")
  }

  showSolved(){
    window.addEventListener('scroll', this.handleScroll)
    this.setState({stage: 2, page:1, totalPages:5, isLoading: true,toBottom:false})

    io.socket.get("/allSquareQuest",{state:2},(result,jwr)=>{
      this.props.applySquare(result.questionList)
      this.setState({totalPages:result.totalPages, page: this.state.page+1, isLoading: false})
    })
  }

  showSolving(){
    window.addEventListener('scroll', this.handleScroll)
    this.setState({stage: 0, page:1, totalPages:5, isLoading: true,toBottom:false})
    io.socket.get("/allSquareQuest",{state:0},(result,jwr)=>{
      this.props.applySquare(result.questionList)
      this.setState({totalPages:result.totalPages, page: this.state.page+1, isLoading: false})
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
    switch(this.state.isLoading){
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
    const actionButton = [
        <FlatButton
            label="确定"
            primary={true}
            onTouchTap={this.handleClose} />
        ]

    // var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || ""; 
		return (
			<div >
        <Dialog 
              actions={actionButton}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              {this.state.openContent}
        </Dialog>
        <div className="squareToAskQuestion" onTouchTap={this.askQuestion}><span className="squareToAskQuestion-inner">发布悬赏</span></div>
        <div className="reward-protocol-index" onTouchTap={this.openRewardProtocol}><img src="./img/rewardProtocol.png" className="rewardProtocolIcon"/>悬赏规则</div>
       {/* <div className="askButtonPlaceholder"></div>
    <Paper key={i} style={style} zDepth={2} children={<SquareQuestion readyAsk="1" history={this.props.history} questions={messageAtomic} />} />*/}
        <Tabs tabItemContainerStyle={allStyle.tabStyle} inkBarStyle={allStyle.inkBarStyle} >
        <Tab label="进行中" style={allStyle.tabButtonStyle} onActive={this.showSolving} >
            {this.loading()}
            {this.showList()}
            
        </Tab>
          <Tab label="已解答" style={allStyle.tabButtonStyle} onActive={this.showSolved} >
            {this.loading()}
            {this.showList()}
            
          </Tab>
          
        </Tabs>
        {this.showLoading()}
        
      </div>
			)
	}
}