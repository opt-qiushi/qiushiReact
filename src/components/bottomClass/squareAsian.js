import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import './squareAnswerAtomic.css'
import GMTtoTime2 from './gmtToTime2'

export default class SquareAsian extends Component{
  constructor(props){
    super(props)
    this.state={
      word:"采纳",
      wordState: 0,
      open: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.isLock=this.isLock.bind(this)
    this.handleOpen=this.handleOpen.bind(this)
    this.changeNumber=this.changeNumber.bind(this)
    this.putTop=this.putTop.bind(this)
    // this.changeStateWord=this.changeStateWord.bind(this)
    
  }

  putTop(){
    if(this.props.pageCategory==1) 
      return (
                    <span className="squareAnswerHead-1-1-1" onTouchTap={this.changeNumber} >
                      置顶
                    </span>
                    )
    else return
  }

  handleClose(){
    this.setState({open: false})
  }

  changeNumber(){
    this.props.changeNumber(this.props.squareAtomic)
  }

  // changeStateWord(){
  //     switch(this.state.wordState){
  //       case 0:
  //           if(this.props.adoptNum>3){
  //             this.setState({open: true})
  //             return 
  //           }
  //           this.props.onAddNum()
  //           this.props.addSquareSelect(this.props.squareAtomic)
  //           this.setState({wordState:1, word:"取消"})
  //           return 
  //       case 1:
  //           this.props.onMinusNum()
  //           this.setState({wordState:0, word:"采纳"})
  //       default:
  //           return 
  //     }
  // }

  // adoptAnswer(){
  //   if(this.props.pageCategory !=1){
  //     return
  //   }
  //   switch(this.state.wordState){
  //     case 0:
  //         return (
  //               <span className="squareAnswerHead-1-1" onTouchTap={this.changeStateWord} >
  //                     {this.state.word}
  //               </span>
  //           )
  //     case 1:

  //         return (
  //               <span className="squareAnswerHead-1-1-1" onTouchTap={this.changeStateWord} >
  //                     {this.state.word}
  //               </span>
  //           )
  //   }
  // }
  handleSubmit(){
    console.log("调用解锁接口")
  }
  handleOpen(){
    this.setState({open:true})
  }
  isLock(){
    if(this.props.pageCategory == 5){
      return <span onTouchTap={this.handleOpen}>请点击解锁</span>
    }else{
      return <span>A: {this.props.squareAtomic.answer}</span>
    }
    
  }
  render(){
    const {squareAtomic,pageCategory}=this.props
    const actionButton = [
        <FlatButton
            label="确定"
            primary={true}
            onTouchTap={this.handleSubmit} />,
        <FlatButton
            label="取消"
            primary={false}
            onTouchTap={this.handleClose} />
        ]
    var headImg = squareAtomic.from.avatar || squareAtomic.from.headimgurl || '';
    return (
        <div>
        <div className="squareAnswerHead">
                    <span className="squareAnswerHeadAvatar" >
                      <img src={headImg}  />
                    </span>
                    <span className="squareAnswerHead-1-0">
                      {squareAtomic.from.name}
                    </span>
                    {/*this.adoptAnswer()*/}
                    {/*
                      *注释置顶，弃置排名
                      *this.putTop()
                    */}
                    <br/>
                    <span className="squareAnswerHead-2-0">
                      {GMTtoTime2(squareAtomic.createdAt)}
                    </span>
                    
                </div>
                <div className="squareAnswerBody">
                  <p className="squareAnswer-question">
                    {this.isLock()}
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
                    是否解锁该问题？
                </Dialog>
            </div>
      )
  }
}