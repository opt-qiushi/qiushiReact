import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import OwnQuestion from '../containers/ownQuestion'
import Subheader from 'material-ui/Subheader'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress'
import './dongtaiComp.css'
import io from '../server'

const circularStyle={
  textAlign: "center"
}

const cardStyle = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
}


export default class MyQuestion extends Component{
	constructor(props){
		super(props)
		this.state={
			pages:1,
			totalPages:1,
			isInfiniteLoading: false
		}
		this.handleInfiniteLoad=this.handleInfiniteLoad.bind(this)
    	this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
	}

	handleInfiniteLoad(){
		if(this.state.pages==1) return 
        this.setState({
            isInfiniteLoading: true
        })
        if(this.state.pages > this.state.totalPages){
          this.setState({isInfiniteLoading: false})
          return 
        }
        io.socket.get('/professional/getMyQuestions', {id: this.props.userId, page: this.state.pages}, (result, jwr) => {
          setTimeout(function() {
            this.props.getOwnQuestionsMore(result.questions)
            var temp=this.state.pages+1
            this.setState({isInfiniteLoading: false, pages: temp})
          }.bind(this), 1500)
        })
  }

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

	componentWillMount(){
		this.props.notShouye()
		io.socket.get('/professional/getMyQuestions', {id: this.props.userId}, (result, jwr) => {
                this.props.getOwnQuestions(result.questions)
                this.setState({totalPages: result.total_pages, pages: 2})
         })
	}

	render(){
		const {questions}=this.props
		var rows=[]
		var i=1
		if(questions!=""){
			questions.forEach(function(atomic){
				rows.push(
					<Paper key={i} style={cardStyle} zDepth={2} children={<OwnQuestion history={this.props.history} questions={atomic} />} />
					)
				i++
			}.bind(this))
		}else{
			rows.push(
	          <div key={i} className="empty">
	          <img src="img/empty.png" />
	          <p>暂时没有提出的问题~</p>
	        </div>
        	)
		}
		return (
			<Infinite elementHeight={178}
                          onInfiniteLoad={this.handleInfiniteLoad}
                          infiniteLoadBeginEdgeOffset={20}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         useWindowAsScrollContainer
                         >{rows}</Infinite>
			)
	}
}