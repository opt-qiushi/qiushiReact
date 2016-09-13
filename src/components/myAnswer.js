import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import Paper from 'material-ui/Paper'
import QuestionAtomic2 from '../containers/questionAtomic2'
import QuestionAtomic3 from '../containers/questionAtomic3'
import DynamicAtomicBinding from '../containers/dynamicAtomicBinding'
import Subheader from 'material-ui/Subheader'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress'
import './dongtaiComp.css'
import io from '../server'

const circularStyle={
  textAlign: "center"
}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

const cardStyle = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
}


export default class MyAnswer extends Component{
	constructor(props){
		super(props)
		this.state={
			pages1:1,
			totalPages1:1,
			isInfiniteLoading1: false,
			pages2:1,
			totalPages2:1,
			isInfiniteLoading2: false
		}
		this.handleInfiniteLoad1=this.handleInfiniteLoad1.bind(this)
    	this.elementInfiniteLoad1=this.elementInfiniteLoad1.bind(this)
    	this.handleInfiniteLoad2=this.handleInfiniteLoad2.bind(this)
    	this.elementInfiniteLoad2=this.elementInfiniteLoad2.bind(this)
	}

	handleInfiniteLoad1(){
		if(this.state.pages1==1) return 
        this.setState({
            isInfiniteLoading1: true
        })
        if(this.state.pages1 > this.state.totalPages1){
          this.setState({isInfiniteLoading1: false})
          return 
        }
        io.socket.get('/professional/getMyAnswers', {id: this.props.userId, state:0, page: this.state.pages1}, (result, jwr) => {
          setTimeout(function() {
            this.props.getNotQuestionsMore(result.questions)
            var temp=this.state.pages1+1
            this.setState({isInfiniteLoading1: false, pages1: temp})
          }.bind(this), 1500)
        })
  }

  handleInfiniteLoad2(){
		if(this.state.pages2==1) return 
        this.setState({
            isInfiniteLoading2: true
        })
        if(this.state.pages2 > this.state.totalPages2){
          this.setState({isInfiniteLoading2: false})
          return 
        }
        io.socket.get('/professional/getMyAnswers', {id: this.props.userId, state:1, page: this.state.pages2}, (result, jwr) => {
          setTimeout(function() {
            this.props.getYesQuestionsMore(result.questions)
            var temp=this.state.pages2+1
            this.setState({isInfiniteLoading2: false, pages2: temp})
          }.bind(this), 1500)
        })
  }

  elementInfiniteLoad2(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

  elementInfiniteLoad1(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

	componentWillMount(){
		this.props.notShouye()
		io.socket.get('/professional/getMyAnswers', {id: this.props.userId, state: 0}, (unresult, jwr) => {
              io.socket.get('/professional/getMyAnswers', {id: this.props.userId, state: 1}, (result, jwr) => {
                  this.props.getNotQuestions(unresult.questions)
                  this.props.getYesQuestions(result.questions)
                  this.setState({totalPages1: unresult.total_pages, pages1: 2, totalPages2: result.total_pages, pages2: 2})
              })
         })
	}

	render(){
		const {notQuestions, yesQuestions}=this.props
		var rows1=[]
		var rows2=[]
		var i=1
		var j=1
		if(notQuestions!=""){
			notQuestions.forEach(function(notAtomic){
				rows1.push(
					<Paper key={i} style={cardStyle} zDepth={2} children={<QuestionAtomic2 history={this.props.history} questions={notAtomic} />} />
					)
				i++
			}.bind(this))
		}else{
			rows1.push(
	          <div key={i} className="empty">
	          <img src="img/empty.png" />
	          <p>暂时没有未回答的问题~</p>
	        </div>
        	)
		}
		if(yesQuestions!=""){
			yesQuestions.forEach(function(yesAtomic){
				rows2.push(
					<Paper key={i} style={cardStyle} zDepth={2} children={<QuestionAtomic3 history={this.props.history} questions={yesAtomic} />} />
					)
				i++
			}.bind(this))
		}else{
			rows2.push(
	          <div key={i} className="empty">
	          <img src="img/empty.png" />
	          <p>您还没有回答过问题~</p>
	        </div>
        	)
		}
		return (
			<Tabs>
			    <Tab label="未回答" >
			      <Infinite elementHeight={178}
                          onInfiniteLoad={this.handleInfiniteLoad1}
                          infiniteLoadBeginEdgeOffset={20}
                         loadingSpinnerDelegate={this.elementInfiniteLoad1()}
                         isInfiniteLoading={this.state.isInfiniteLoading1}
                         useWindowAsScrollContainer
                         >
			       	 {rows1}
			       </Infinite>
			    </Tab>
			    <Tab label="已回答" >
			      <Infinite elementHeight={203}
                          onInfiniteLoad={this.handleInfiniteLoad1}
                          infiniteLoadBeginEdgeOffset={20}
                         loadingSpinnerDelegate={this.elementInfiniteLoad1()}
                         isInfiniteLoading={this.state.isInfiniteLoading1}
                         useWindowAsScrollContainer
                         >
			        {rows2}
			        </Infinite>
			    </Tab>
			  </Tabs>
			)
	}
}