import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import io from '../server'
import SquareQuestion from './bottomClass/squareQuestion'
import SquareAnswerPool from './bottomClass/squareAnswerPool'
import SquareSelectPool from '../containers/squareSelectPool2'
import Dialog from 'material-ui/Dialog'

const allStyle={
	squareToAnswer:{
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '60px',
		backgroundColor: 'white'
	},
	inner:{
		display: 'inline-block',
		width: '80%',
		marginLeft: '10%',
		marginTop: '20px',
		height: '40px',
		background: '#0A964C',
		color: 'white',
		lineHeight: '40px',
		textAlign: 'center',
		borderRadius: '30px'
	},
	placeHolder:{
		height:'60px'
	}
}

export default class SquareQuestionDetail extends Component{
	constructor(props){
		super(props)
		this.state={
			pageCategory: 2,
			isAnswering:false,
			open: false,
			open2: false
		}
		this.hasAdoptArea=this.hasAdoptArea.bind(this)
		this.buttonField=this.buttonField.bind(this)
		this.adoptQuestion=this.adoptQuestion.bind(this)
		this.answerQuestion=this.answerQuestion.bind(this)
		this.handleClose=this.handleClose.bind(this)
		this.handleClose2=this.handleClose2.bind(this)
	}

	handleClose(){
		this.setState({open: false})
	}

	handleClose2(){
		this.setState({open2: false})
		this.props.clearSelectData()
		this.props.history.push('/square')
	}


	  componentDidMount(){
	  	 io.socket.post('/squareType', {questionId: this.props.squareQuestion.id, userId: localStorage.getItem('userId')}, (result, jwr) => {
         
            this.setState({pageCategory: result.pageCategory})
            if(this.state.pageCategory==1) this.props.clearSelectData()
        })
	  }

	  hasAdoptArea(){
	  	/* 这里记得改回1 */
	  	if(this.state.pageCategory==1 || this.state.pageCategory==4 || this.state.pageCategory==5)
	  	return <SquareSelectPool  pageCategory={this.state.pageCategory} history={this.props.history} />
	  	else return
	  }

	  answerQuestion(){
	  	this.props.history.push("/upload")
	  }

	  adoptQuestion(){
	  	if(this.props.adoptNum==0){
	  		this.setState({open: true})
	  		return 
	  	}
	  	else{
	  		var temp=[]
	  		this.props.selectData.forEach(function(selectAtomic){
	  			temp.push(selectAtomic.id)
	  		})
	  		io.socket.post("/adopt",{lockedAnswerList:temp, questionId:this.props.squareQuestion.id },(result,jwr)=>{
		      this.setState({open2: true})
		    })
	  	}
	  }

	  buttonField(){
	  	if(this.state.pageCategory==1)

	  	return <div style={allStyle.squareToAnswer} onTouchTap={this.adoptQuestion}><span className="squareToAskQuestion-inner">提交采纳</span></div>

	  	else if(this.state.pageCategory==2 && this.props.squareQuestion.state==0)

	  	return <div style={allStyle.squareToAnswer} onTouchTap={this.answerQuestion}><span className="squareToAskQuestion-inner">我要回答</span></div>

	  	else return
	  }


	  render(){
		const {squareQuestion}=this.props
		var row = []
		if(this.state.isAnswering){
			row.push()
		}
		var actionButton=[
			<FlatButton
	            label="确定"
	            primary={true}
	            onTouchTap={this.handleClose} />
		]
		var actionButton2=[
			<FlatButton
	            label="确定"
	            primary={true}
	            onTouchTap={this.handleClose2} />
		]
		return (
			<div>
			<div style={allStyle.placeHolder}></div>
			<SquareQuestion style={allStyle.questionBox} squareQuestion={squareQuestion} />
			{this.hasAdoptArea()}
			<SquareAnswerPool squareQuestion={squareQuestion} pageCategory={this.state.pageCategory} />
			{this.buttonField()}
			<Dialog
                      title="提示"
                      actions={actionButton}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                      >
                      请至少选择一个问题
                    </Dialog>
            <Dialog
                      title="提示"
                      actions={actionButton2}
                      modal={false}
                      open={this.state.open2}
                      onRequestClose={this.handleClose2}
                      >
                      提交成功！
                    </Dialog>
			</div>
		)
	}
}