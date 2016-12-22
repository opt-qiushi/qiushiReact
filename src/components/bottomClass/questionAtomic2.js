import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './questionAtomic.css'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {green500} from 'material-ui/styles/colors'
import Snackbar from 'material-ui/Snackbar'
import io from '../../server'

 const contextStyle={
    textAlign:"center"
 }

export default class QuestionAtomic2 extends Component{
  constructor(props){
    super(props)
    this.state={
      words:"",
      open:false,
      snackOpen:false
    }
    this.handleClick=this.handleClick.bind(this)
    this.showAvatar=this.showAvatar.bind(this)
    this.showName=this.showName.bind(this)
    this.handleOpen=this.handleOpen.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleRequestClose=this.handleRequestClose.bind(this)
  }

  handleRequestClose(){
    this.setState({snackOpen: false})
  }

  handleChange(event){
    this.setState({words:event.target.value})
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  handleCancel(){
    this.setState({words:"", open: false})
  }

  handleSubmit(){
    if(this.state.words=="") return this.handleClose()
    else {
      io.socket.get('/question/answer', {questionID:this.props.questions.id, answer:this.state.words}, (result, jwr) => {
            this.setState({words:"", open: false, snackOpen: true})
            setTimeout(function(){
              io.socket.get('/professional/getMyAnswers', {id: this.props.userId, state: 0}, (unresult, jwr) => {
                io.socket.get('/professional/getMyAnswers', {id: this.props.userId, state: 1}, (result, jwr) => {
                    this.props.getNotQuestions(unresult.questions)
                    this.props.getYesQuestions(result.questions)
                })
         })}.bind(this),1500)
      })
    }
  }

  handleClick(){
    console.log(this.props.statistic)
    if(this.props.statistic==1){
      this.handleOpen()
    }
  }

  showAvatar(){
    if(this.props.questions.from.avatar) return this.props.questions.from.avatar
      else return this.props.userInfo.avatar
  }

  showName(){
    if(this.props.questions.from.name) return this.props.questions.from.name
    else return this.props.userInfo.name
  }

	render(){
		const {questions}=this.props
		return (
			<div  className="dynamicStructure" onClick={this.handleClick} >
                <div className="dynamicHead">
                    <span className="dynamicHeadAvatar" >
                      <img src={this.showAvatar()} />
                    </span>
                      <span className="dynamicHead-1">
                        <span className="dynamicHead-1-0">
                          {this.showName()}
                        </span>
                        <span className="dynamicHead-1-1">
                          {GMTtoTime(questions.createdAt)}
                        </span>
                      </span>
                </div>
                <div className="dynamicBody">
                  <p className="sign-green">
                    Q: {questions.question}
                  </p>
                  {/*答案显示*/}
                  <p>A: {this.props.dynamicQuestion.answer}</p>
                </div>
                {/*<div className="dynamicStatistic">
                                    <img src="./img/question_detail_addCollect.png" alt="收藏数" />
                                    <div>{questions.collectNum}</div>
                                    <img src="./img/question_detail_commentNum.png" />
                                    <div>{questions.commentNum}</div>
                                    <img src="./img/question_detail_watch.png" />
                                    <div>{questions.watchNum}</div>
                                </div>*/}
                <div className="dynamicEnd"></div>
                <Dialog
                  title="开始回答"
                  actions={[
                    <FlatButton
                      label="取消"
                      primary={true}
                      onTouchTap={this.handleCancel} />,
                    <FlatButton
                      label="确定"
                      primary={true}
                      keyboardFocused={true}
                      onTouchTap={this.handleSubmit} />,
                  ]}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose} 
                  contentStyle={{textAlign:'center'}} >
                  <TextField
                    style={{textAlign:'justify'}}
                    floatingLabelFocusStyle={{color:green500}}
                    underlineFocusStyle={{borderColor:green500}}
                            floatingLabelText="请输入您的回复"
                            multiLine={true}
                          rowsMax={4}
                          rows={1} 
                          value={this.state.words}
                          onChange={this.handleChange} />
                </Dialog>
                <Snackbar
                  open={this.state.snackOpen}
                  message="回答成功！"
                  autoHideDuration={1500}
                  onRequestClose={this.handleRequestClose} />
            </div>
			)
	}
}