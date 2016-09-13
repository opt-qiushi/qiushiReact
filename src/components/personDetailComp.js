import React, { Component } from 'react'
import PersonBackBinding from '../containers/personBackBinding'
import IntroductionBinding from '../containers/introductionBinding'
import QiushiQuestionsBinding from '../containers/qiushiQuestionsBinding'
import AskboxBinding from '../containers/askboxBinding'
import UserInputBinding from '../containers/userInputBinding'
import Paper from 'material-ui/Paper'
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

export default class PersonDetailComp extends Component{
  constructor(props) {
      super(props)
      this.state={
        tenQuestions: ""
      }
      this.showUserInput=this.showUserInput.bind(this)
  }

  componentWillMount(){
    this.props.notShouye()
    window.scrollTo(0,0)
    io.socket.post('/professional/getUserDetail', { from: this.props.userId, 
      id: this.props.guestId }, (result, jwr) => {
         this.props.getCurrentDetail(result)
         if(this.props.person.detail.qiushiQuestions!="")
            this.setState({tenQuestions:(<Paper style={style2} zDepth={2} children={<QiushiQuestionsBinding />} />)})
   })
  }

  showUserInput(){
    if(this.props.userId!=this.props.person.id) return <Paper style={style2} zDepth={2} children={<UserInputBinding />} />
      else return 
  }

	render(){
		return (
		 	<div className="personalDetail">
		 		   <Paper style={style} zDepth={2} children={<PersonBackBinding />} />
		  		 <Paper style={style2} zDepth={2} children={<IntroductionBinding />} />
            {this.state.tenQuestions}
           <Paper style={style2} zDepth={2} children={<AskboxBinding  history={this.props.history} />} />
            {this.showUserInput()}
      </div>
		)
	}
}

