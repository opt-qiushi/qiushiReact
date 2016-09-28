import React, { Component } from 'react'
import PersonBackBinding from '../containers/personBackBinding'
import IntroductionBinding from '../containers/introductionBinding'
import QiushiQuestionsBinding from '../containers/qiushiQuestionsBinding'
import AskboxBinding from '../containers/askboxBinding'
import UserInputBinding from '../containers/userInputBinding'
import cookie from 'react-cookie'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import "./personalDetailComp.css"
import io from '../server'

const style = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white'
};

const style2 = {
  marginTop: "24px",
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
};

const RaisedButtonStyle = {
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
      // location.href="http://www.opt.com.cn/chat1?redirectUrl=www.opt.com.cn/vipDetail&guestId="+this.props.guestId
    }
    io.socket.post('/professional/getUserDetail', { from: this.props.userId, 
      id: this.props.guestId }, (result, jwr) => {
         this.props.getCurrentDetail(result)
         if(this.props.person.detail.qiushiQuestions!="")
            this.setState({tenQuestions:(<Paper style={style2} zDepth={2} children={<QiushiQuestionsBinding />} />)})
   })

  }

  showUserInput(){
    if(this.props.userId!=this.props.person.detail.id) return <Paper style={style2} zDepth={2} children={<UserInputBinding />} />
      else return 
  }

  showIntroduction(){
    if(this.props.person.detail.introduction!="") return <Paper style={style2} zDepth={2} children={<IntroductionBinding />} />
      else return
  }

  showQuestions(){
    if(this.props.person.question!="") return <Paper style={style2} zDepth={2} children={<AskboxBinding  history={this.props.history} />} />
      else return
  }
  toIndex(){
    location.href = "/qiushi";
    // setTimeout(function(){
    //   this.props.history.push("/qiushi")
    // }.bind(this),300);
  }

	render(){
		return (
		 	<div className="personalDetail">
        <RaisedButton style={RaisedButtonStyle} backgroundColor="#0A964C" labelColor="white" label="返回首页" onTouchTap={this.toIndex}/>
        
 		    <Paper style={style} zDepth={2} children={<PersonBackBinding />} />
        {this.showIntroduction()}
        {this.state.tenQuestions}
        {this.showQuestions()}
        {this.showUserInput()}
      </div>
		)
	}
}

