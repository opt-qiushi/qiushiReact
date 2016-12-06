import React, { Component } from 'react'
import './squareAnswerPool.css'
import io from '../../server'
import SquareSelectAnswer from '../../containers/squareSelectPool'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const allStyle={
  outBox:{
    height: '30px',
    textAlign: 'center',
    fontSize: '16px',
    color:'white',
    marginTop:'24px'
  },
  lockErea:{

  }
}

export default class SquareSelectPool extends Component{
	constructor(props){
   	 super(props)
     this.state={
        open:false
     }
     this.showWater=this.showWater.bind(this)
     this.unlock=this.unlock.bind(this)
     this.handleClose=this.handleClose.bind(this)
     this.handleSubmit=this.handleSubmit.bind(this)
  	}

  unlock(){
    this.setState({open: true})
  }

  showWater(){
    if(this.props.pageCategory==4 || this.props.pageCategory==1)
    return <SquareSelectAnswer pageCategory={this.props.pageCategory}/>
    else if(this.props.pageCategory==5){
      var temp=this.props.squareQuestion.lockedAnswerList.length
      var row=[]
      // for(var i=0;i<temp;i++){
      //   row.push(
      //       <div key={i} style={allStyle.outBox} onTouchTap={this.unlock} >
      //         请解锁该问题
      //       </div>
      //       )
      // }
      row.push(
        <div key={1} style={allStyle.outBox} onTouchTap={this.unlock} >
          一元解锁最佳答案
        </div>
        )
      return row
    }
  }

  handleClose(){
    this.setState({open: false})
  }

  handleSubmit(){
    this.setState({open: false})
    console.log(this.props.squareQuestion.id)
    io.socket.post('/unlockSquareQuest', {questionId: this.props.squareQuestion.id, userId: localStorage.getItem('userId')}, (result, jwr) => {
         this.props.setSelectData(result)
         this.props.history.push('/square')
    })
  }

  componentDidMount(){
    if(this.props.pageCategory==4){
      io.socket.post('/unlock', {questionId: this.props.squareQuestion.id}, (result, jwr) => {
         this.props.setSelectData(result)
        })
    }
  }


	render(){
    var rows= []; 
    var actionButton=[
      <FlatButton
              label="确定"
              primary={true}
              onTouchTap={this.handleSubmit} />,
      <FlatButton 
              label="取消"
              primary={false}
              onTouchTap={this.handleClose} />
    ]
		return (
        <div>
          <div className="squareEnd"></div>
          <div className="pool-head-container">
            <div className="pool-head">最佳回答</div>
          </div>
          <div className="pool-head-desc">（被采纳的答案会被设定收费收听，并获得一定比例赏金）</div>
          {this.showWater()}
          <Dialog
            title="提示"
            actions={actionButton}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            您是否解锁该问题？
          </Dialog>
        </div>
			)
	}
}