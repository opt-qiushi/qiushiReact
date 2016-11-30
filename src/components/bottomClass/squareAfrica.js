import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import './squareAnswerAtomic.css'
import GMTtoTime from './gmtToTime'

export default class SquareAfrica extends Component{
  constructor(props){
    super(props)
    this.state={
      word:"采纳",
      wordState: 0,
      open: false
    }
    this.changeStateWord=this.changeStateWord.bind(this)
    this.handleClose=this.handleClose.bind(this)
  }

  handleClose(){
    this.setState({open: false})
  }

  changeStateWord(){
      switch(this.state.wordState){
        case 0:
            if(this.props.adoptNum>2){
              this.setState({open: true})
              return 
            }

            this.props.addSquareSelect(this.props.squareAtomic)
            this.setState({wordState:1, word:"已采纳"})
            return 
        case 1:
            this.props.deleteSquareSelect(this.props.squareAtomic)
            this.setState({wordState:0, word:"采纳"})
        default:
            return 
      }
  }

  adoptAnswer(){
<<<<<<< HEAD
<<<<<<< HEAD
    if(this.props.pageCategory !=2){
=======
=======
>>>>>>> origin/devJUE
    /* 记得改回1 */
    if(this.props.pageCategory !=1){
>>>>>>> origin/devJUE
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
    return (
        <div>
        <div className="squareAnswerHead">
                    <span className="squareAnswerHeadAvatar" >
                      <img src={squareAtomic.from.avatar}  />
                    </span>
                    <span className="squareAnswerHead-1-0">
                      {squareAtomic.from.name}
                    </span>
                    {this.adoptAnswer()}
                    <br/>
                    <span className="squareAnswerHead-2-0">
                      {GMTtoTime(squareAtomic.createdAt)}
                    </span>
                    
                </div>
                <div className="squareAnswerBody">
                  <p className="squareAnswer-question">
                    A：{squareAtomic.answer}
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