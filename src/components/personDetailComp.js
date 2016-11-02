import React, { Component } from 'react'
import PersonBackBinding from '../containers/personBackBinding'
import IntroductionBinding from '../containers/introductionBinding'
import QiushiQuestionsBinding from '../containers/qiushiQuestionsBinding'
import AskboxBinding from '../containers/askboxBinding'
import UserInputBinding from '../containers/userInputBinding'
import cookie from 'react-cookie'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import "./personalDetailComp.css"
import io from '../server'

const style = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
};

const style2 = {
  marginTop: "12px",
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px',
};

const FlatButtonStyle = {
  display:"inline-block",
  position: "fixed",
  right: "0",
  top:"20px",
  borderRadius:"0",
}
export default class PersonDetailComp extends Component{
  constructor(props) {
      super(props)
      this.state={
        tenQuestions: ""
      }
      this.showUserInput=this.showUserInput.bind(this)
      this.showIntroduction=this.showIntroduction.bind(this)
      this.showQuestions=this.showQuestions.bind(this)
  }

  componentWillMount(){
    this.props.notShouye()
    window.scrollTo(0,0)
    var userId=cookie.load('userId')
    if(!userId){
      location.href="https://www.opt.com.cn/chat1?redirectUrl=www.opt.com.cn/qiushi&fromUrl=vipDetail&id="+this.props.guestId
    }
    io.socket.post('/professional/getUserDetail', { from: this.props.userId, 
      id: this.props.guestId }, (result, jwr) => {
        this.props.getCurrentDetail(result)
        if(this.props.person.detail.qiushiQuestions!=""){
          this.setState({tenQuestions:(<Paper style={style2} zDepth={2} children={<QiushiQuestionsBinding />} />)})
        }else{
          this.setState({tenQuestions:(<div></div>)})
        }
        var headImg = result.detail.headimgurl || result.detail.avatar || "";
            // if(result.detail.headimgurl){
            //   headImg = result.detail.headimgurl;
            // }else{
            //   headImg = result.detail.avatar;
            // }
        (function wxJsApi(intro,headImg){
              var target = location.href.split("#")[0];
              // var target = encodeURIComponent(location.href.split("#")[0]);
              io.socket.get("/config",{targetUrl:localStorage.getItem('fromUrl')},(result, jwr) =>{
                // result.debug = true;
                wx.config(result)
                wx.ready(function(){
                  wx.onMenuShareTimeline({
                      title: intro, // 分享标题
                      link: '', // 分享链接
                      imgUrl: headImg, // 分享图标
                      success: function () { 
                          // 用户确认分享后执行的回调函数
                      },
                      cancel: function () { 
                          // 用户取消分享后执行的回调函数
                      }
                  });
                  wx.onMenuShareAppMessage({
                      title: '求士', // 分享标题
                      desc: intro, // 分享描述
                      link: '', // 分享链接
                      imgUrl: headImg, // 分享图标
                      type: '', // 分享类型,music、video或link，不填默认为link
                      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                      success: function () { 
                          // 用户确认分享后执行的回调函数
                      },
                      cancel: function () { 
                          // 用户取消分享后执行的回调函数
                      }
                  });
                  //wx.hideAllNonBaseMenuItem(); 
                });  
              });      
            })(result.detail.intro,headImg)  
    })
  }
  showUserInput(){
    if(this.props.userId!=this.props.person.detail.id) return <Paper style={style2} zDepth={2} children={<UserInputBinding />} />
      else return 
  }

  showIntroduction(){
    if(this.props.person.detail.introduction!="") return <Paper style={style2} zDepth={2} children={<IntroductionBinding />}/>
      else return
  }

  showQuestions(){
    if(this.props.person.question.length!=0) return <Paper style={style2} zDepth={2} children={<AskboxBinding  history={this.props.history} />} />
      else return
  }
  toIndex(){
    setTimeout(function(){
      location.href = "/qiushi";
      // this.props.history.push("/qiushi")
    }.bind(this),300);
  }

	render(){
		return (
		 	<div className="personalDetail">
        <FlatButton style={FlatButtonStyle} backgroundColor="#0A964C" labelStyle={{color:"white"}} label="返回首页" onTouchTap={this.toIndex}/>
        
 		    <Paper style={style} zDepth={2} children={<PersonBackBinding />} />
        {this.showIntroduction()}
        {this.state.tenQuestions}
        {this.showQuestions()}
        {this.showUserInput()}
      </div>
		)
	}
}

