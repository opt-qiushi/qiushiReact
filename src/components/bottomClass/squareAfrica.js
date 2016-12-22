import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import './squareAnswerAtomic.css'
import GMTtoTime2 from './gmtToTime2'

export default class SquareAfrica extends Component{
  constructor(props){
    super(props)
    this.state={
      word:"采纳",
      wordState: 0,
      open: false,
      duration: '',
    }
    this.changeStateWord=this.changeStateWord.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.voiceControl=this.voiceControl.bind(this)
  }

  handleClose(){
    this.setState({open: false})
  }
  componentDidMount(){
    if(this.refs.audioTag){
      var target = this.refs.audioTag;
      var i = 0;
      var intervalKey = setInterval(function(){
        i++;
        if(target.readyState == 4 || i==30){
          console.log(target.readyState)
          var duration = parseInt(target.duration) + '"'
          this.setState({duration:duration})
          clearInterval(intervalKey)
        }
      }.bind(this),1000)
    }
    
  }
  voiceControl(){
    var target = this.refs.audioTag;
    var img = this.refs.audioImg;
    target.onended = function() {
      img.src = "./img/voice-icon.png"
    }.bind(this);
    if(!target.paused){
      target.pause()
      img.src="./img/voice-icon.png"
    }else{
      var allAudio = document.querySelectorAll('audio')
      var allImg = document.querySelectorAll('img[src="./img/voice-icon-move.gif"]')
      for(let i=0;i<allAudio.length;i++){
        allAudio[i].pause();
      }
      for(let i=0;i<allImg.length;i++){
        allImg[i].src="./img/voice-icon.png"
      }
      target.play()
      img.src = "./img/voice-icon-move.gif"
    }
  }
  changeStateWord(){
      switch(this.state.wordState){
        case 0:
            if(this.props.adoptNum>2){
              this.setState({open: true})
              return 
            }

            this.props.addSquareSelect(this.props.squareAtomic)
            this.setState({wordState:1, word:"取消"})
            return 
        case 1:
            this.props.deleteSquareSelect(this.props.squareAtomic)
            this.setState({wordState:0, word:"采纳"})
        default:
            return 
      }
  }

  adoptAnswer(){
    if(this.props.pageCategory !=1){
      return
    }
    switch(this.state.wordState){
      case 0:
          return (
                <span className="squareAnswerHead-1-1" onTouchTap={this.changeStateWord} >
                      {this.state.word}
                </span>
            )
      case 1:

          return (
                <span className="squareAnswerHead-1-1-1" onTouchTap={this.changeStateWord} >
                      {this.state.word}
                </span>
            )
    }
  }

  render(){
    const {squareAtomic}=this.props
    const actionButton = [
        <FlatButton
            label="确定"
            primary={true}
            onTouchTap={this.handleClose} />
        ]
    var answerArea = []
    var headImg = squareAtomic.from.avatar || squareAtomic.from.headimgurl ||'./img/vipDetail/hosthead.png';
    var voiceList = squareAtomic.voiceList;
    if(voiceList.length>0){
      for(let i=0;i<voiceList.length;i++){
        answerArea.push(
          <div key={i}>
            <div onTouchTap={this.voiceControl}><span className="square-voice-a">A：</span><span className="square-voice-area"><img src="./img/voice-icon.png" ref="audioImg"/></span><span className="square-voice-duration">{this.state.duration}</span></div>
            <audio src={voiceList[i]} preload="metadata" ref="audioTag"></audio>
          </div>
        )
      }
    }else{
      answerArea.push(<div key='1'><span className="square-question-q">A：</span>{squareAtomic.answer}</div>)
    }
    return (
        <div>
        <div className="squareAnswerHead">
                    <span className="squareAnswerHeadAvatar" >
                      <img src={headImg}  />
                    </span>
                    <span className="squareAnswerHead-1-0">
                      {squareAtomic.from.name}
                    </span>
                    {this.adoptAnswer()}
                    <br/>
                    <span className="squareAnswerHead-2-0">
                      {GMTtoTime2(squareAtomic.createdAt)}
                    </span>
                    
                </div>
                <div className="squareAnswerBody">
                  <p className="squareAnswer-question">
                    {answerArea}
                  </p>
                </div>
                <div className="squareAnswerEnd"></div>
                <Dialog
                      title="提示"
                      actions={actionButton}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                      >
                      对不起，采纳数目已经达到上限
                    </Dialog>
            </div>
      )
  }
}