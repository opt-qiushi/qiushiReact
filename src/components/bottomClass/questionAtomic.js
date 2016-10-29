import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './questionAtomic.css'
import io from '../../server'
import FlatButton from 'material-ui/FlatButton'
import UploadImg from './UploadImg'
//问题详情，动态页面的问题
const focusLabelStyle = {
  color: "#0A964C"
}
const focusStyle = {
  float:"left",
  height:"20px",
  lineHeight:"13px",
  border:"1px solid #0A964C",
  marginTop:"-4px",
  marginLeft:"60px",
}
const focusStyle2 = {
  float:"left",
  height:"20px",
  lineHeight:"13px",
  border:"1px solid #999",
  marginTop:"-4px",
  marginLeft:"60px",
}
export default class QuestionAtomic extends Component{
  constructor(props){
    super(props)
    this.state = {isOpen:true,hasOpen:false,isFocus:0}
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.fromImgTap=this.fromImgTap.bind(this)
    this.toImgTap=this.toImgTap.bind(this)
    this.handleFocus=this.handleFocus.bind(this)
  }
  handleFocus(){
    var temp = this.state.isFocus;
    var reverse;
    if(temp == 0){
      reverse = 1;
    }else{
      reverse = 0;
    }
    var qId = this.props.questions.question.id || this.props.questions.id;
    setTimeout(function(){
      io.socket.get('/professional/collect', {id:localStorage.getItem('userId'), questionID: qId,flag:temp}, (result, jwr) => {
      // console.log(result)
      if(result.ok == 1 && temp ==0){
        alert("收藏成功");
        this.setState({isFocus:reverse})
      }else if(result.ok == 1 && temp ==1){
        alert("取消收藏成功")
        this.setState({isFocus:reverse})
      }else {
        alert("未知错误")
      }
    });
    }.bind(this),500)
    // io.socket.get('/professional/collect', {id:localStorage.getItem('userId'), questionID: this.props.questions.question.id,flag:temp}, (result, jwr) => {
    //   console.log(result)
    //   if(result.ok == 1 && temp ==0){
    //     alert("收藏成功");
    //     this.setState({isFocus:reverse})
    //   }else if(result.ok == 1 && temp ==1){
    //     alert("取消收藏成功")
    //     this.setState({isFocus:reverse})
    //   }else {
    //     alert("未知错误")
    //   }
    // });
  }
  handleClick(){
    //判断是问题详情页还是动态页面
    if(this.props.shenglue){
      io.socket.post('/question/getQuestionDetail', {id: this.props.questions.id,userID: localStorage.getItem("userId")}, (result, jwr) => {
        io.socket.post('/comments/getComments', {questionID: this.props.questions.id}, (result2, jwr) => {              
                this.props.getQuestionDetail(result)
                this.props.getCommentDetail(result2)
                // console.log("result:")
                // console.log(result)
                setTimeout(function(){
                this.props.history.push("/questionDetail?id=" + this.props.questions.id)
              }.bind(this),500)
        })
      })
    }
  }
  handleStateChange(e){
    e.stopPropagation()
    var flag = this.state.isOpen;
    if(!flag){
      this.refs.qiushiAnswer.style.maxHeight = 'none';
    }else{
      this.refs.qiushiAnswer.style.maxHeight = 120 + 'px';
    }
    flag = !flag;
    this.setState({isOpen:flag})
  }
  componentDidMount(){
    if(this.props.shenglue){
      // this.refs.displayNode.style.height="150px"
      this.refs.displayNode.style.maxHeight="150px"
      this.refs.displayNode.style.overflow="hidden"
    }
    if(this.refs.qiushiAnswer.offsetHeight > 106 && this.props.shenglue){
        this.refs.qiushiAnswer.style.maxHeight = 120 + 'px';
        this.setState({isOpen:false,hasOpen:true})
    }
    if(this.props.questions.collectFlag){
        this.setState({isFocus:this.props.questions.collectFlag})
    }
  }
  fromImgTap(e){
    e.stopPropagation();
    this.props.saveGuestId(this.props.questions.from.id);
    setTimeout(function(){
      this.props.history.push("/vipDetail?id=" + this.props.questions.from.id);
    }.bind(this),500)
    // console.log(this.props.questions.from.id)

    // console.log(this.props.questions.to.id)
  }
  toImgTap(e){
    e.stopPropagation();
    this.props.saveGuestId(this.props.questions.to.id);
    setTimeout(function(){
      this.props.history.push("/vipDetail?id=" + this.props.questions.to.id);
    }.bind(this),500)
    // console.log(this.props.questions.to.id)
  }
	render(){
    var openArea = [],
        collectArea = [];
    if(this.state.hasOpen && !this.state.isOpen){
      openArea.length = 0;
      openArea.push(<div key="1" className="openArea" onTouchTap={this.handleStateChange}><img src="./img/向下箭头.png" key="down"/></div>)
    }else if(this.state.hasOpen && this.state.isOpen){
      openArea.length = 0;
      openArea.push(<div key="2" className="openArea" onTouchTap={this.handleStateChange}><img src="./img/向上箭头.png" key="up" /></div>);
    }
    if(!this.props.shenglue && (this.state.isFocus === 0)){
      collectArea.push(<div key="1"><FlatButton label="加入收藏" labelStyle={focusLabelStyle} style={focusStyle} onTouchTap={this.handleFocus}/></div>)
    }else if(!this.props.shenglue && (this.state.isFocus === 1)){
      collectArea.push(<div key="2"><FlatButton label="取消收藏"  style={focusStyle2} onTouchTap={this.handleFocus}/> </div>)
    }else{
      collectArea.push(<div key="-1"></div>)
    }
		// const {questions}=this.props
    //动态和问题详情的props结构不同，待修改
    // console.log(this.props)
    if(typeof this.props.questions.question == "string"){
      var questions = this.props.questions;
    }else{
      var questions = this.props.questions.question;
    }
		//处理回答的段落显示
		var rows=[];
		var k=1;
    if(questions.answer){
      var newAnswer = questions.answer.replace(/\n/g,"/n").replace(/\r/g,"/n");
      var answerAtomic = newAnswer.split("/n");
      answerAtomic[0] = "A：" + answerAtomic[0];
      answerAtomic.forEach(function(atomic){
        rows.push(
          <div key={k}>{atomic}</div>
        );
        k++;
      });
    }else{
      rows.push(<div key="-1"></div>);
    }
        //处理追问循环
        var rows3=[];
        var i=1;
        if(questions.addQuestions && questions.addQuestions.length > 0){
          questions.addQuestions.forEach(function(addAtomic){
          var newAnswer = addAtomic.answer.replace(/\n/ig,"/n").replace(/\r/ig,"/n");
            var answerAtomic = newAnswer.split("/n");
            var rows2=[]
            var j=1
            answerAtomic[0] = "A：" + answerAtomic[0];
            answerAtomic.forEach(function(atomic){
              rows2.push(
                <div key={j}>{atomic}</div>
              );
              j++;
            })
            rows3.push(
                <div key={i} className="dynamicBottom">
                  <div className="dynamicBottom-0">
                    <div className="dynamicBottom-0-1">
                      <div className="dynamicBottom-0-0">追问</div>
                      Q：{addAtomic.question}
                    </div>
                  </div>
                  <div className="dynamicBottom-0-2">{rows2}</div>
                </div>
              );
            i++;
         })
        }else{
          rows3.push(<div key="-1"></div>)
        }
    var fromHeadImgUrl = questions.from.avatar || questions.from.headimgurl || "";    
    var toHeadImgUrl = questions.to.avatar || questions.to.headimgurl || "";
		return (
			<div  ref="duihuakuang" className="dynamicStructure" onTouchTap={this.handleClick} >
                <div className="dynamicHead">
                    <span className="dynamicHeadAvatar" >
                      <img src={fromHeadImgUrl}  onTouchTap={this.fromImgTap}/>
                    </span>
                      <span className="dynamicHead-1">
                        <span className="dynamicHead-1-0">
                          {questions.from.name}
                        </span>
                        <span className="dynamicHead-1-1">
                          {GMTtoTime(questions.createdAt)}
                        </span>
                      </span>
                    
                </div>
                <div className="dynamicBody">
                  <p className="dynamic-question">
                    Q：{questions.question}
                  </p>
                </div>
                <div className="dynamicHead">
                    <div className="dynamicHeadAvatar" >
                      <img src={toHeadImgUrl} onTouchTap={this.toImgTap}/>
                    </div>
                      <div className="dynamicHead-1">
                        <span className="dynamicHead-1-0">
                          {questions.to.name}
                        </span>
                        <div className="dynamicHead-1-1">
                          {questions.to.title}
                        </div>
                      </div>
                </div>
                <div className="dynamicBody" ref="qiushiAnswer">
                  {rows}
                </div>
                {openArea}
                <div ref="displayNode" >
                  {rows3}
                </div>
                <div className="dynamicStatistic">
                    {collectArea}
                    {/*<img src="./img/question_detail_addCollect.png" alt="收藏数" />
                                        <div className="bottom-num">{questions.collectNum}</div>
                                        <img src="./img/question_detail_commentNum.png" />
                                        <div className="bottom-num">{questions.commentNum}</div>
                                        <img src="./img/question_detail_watch.png" />
                                        <div className="bottom-num">{questions.watchNum}</div>*/}
                    <div className="bottom-num">{questions.watchNum}</div>
                    <img src="./img/question_detail_watch.png" />
                    <div className="bottom-num">{questions.commentNum}</div>
                    <img src="./img/question_detail_commentNum.png" />
                    <div className="bottom-num">{questions.collectNum}</div>
                    <img src="./img/question_detail_addCollect.png" alt="收藏数" />
                </div>
                <div className="dynamicEnd"></div>
                <UploadImg/>
            </div>
			)
	}
}