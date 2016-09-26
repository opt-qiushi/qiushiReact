import React, { Component } from 'react'
import io from "../server"
import Paper from 'material-ui/Paper'
import DynamicAtomicBinding from '../containers/dynamicAtomicBinding'
import Subheader from 'material-ui/Subheader'
import CircularProgress from 'material-ui/CircularProgress'
import './dongtaiComp.css'

const style = {
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'white',
  minHeight: '100px'
}

const circularStyle={
  textAlign: "center"
}

export default class DongtaiComp extends Component{
	constructor(props){
		super(props)
		this.state={
			isInfiniteLoading: false,
			pages:1,
			totalPages:1
		}
		this.handleInfiniteLoad=this.handleInfiniteLoad.bind(this)
    	this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
    	this.showLoading=this.showLoading.bind(this)
    	this.handleScroll=this.handleScroll.bind(this)
	}

	handleScroll(){
	    var scrollviewOffsetY = document.body.scrollTop
	    var scrollviewFrameHeight = document.body.clientHeight
	    var scrollviewContentHeight = document.body.scrollHeight

	    var sum = scrollviewOffsetY+scrollviewFrameHeight
	    if(sum >= scrollviewContentHeight-5 && !this.state.isInfiniteLoading){
	      return this.handleInfiniteLoad()
	    }
	    return 
	  }

	showLoading(){
		if(this.state.isInfiniteLoading) return this.elementInfiniteLoad()
      	else return 
	}

	componentDidMount(){
		this.props.changeDongtai()
		this.props.shouye()
		window.scrollTo(0,0)
		io.socket.get('/professional/getNews', {id: this.props.userId}, (news, jwr) => {
              this.props.getDongtai(news)
              this.setState({totalPages:news.total_pages, pages: 2})
          })
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
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
        io.socket.get('/professional/getNews', {id: this.props.userId, page: this.state.pages}, (result, jwr) => {
          setTimeout(function() {
          	this.props.getDongtaiMore(result)
            var temp=this.state.pages+1
            this.setState({isInfiniteLoading: false, pages: temp})
          }.bind(this), 1500)
        })
  	}

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

	render(){
		const {newMessage}=this.props
		var rows=[]
		var i=1
		if(newMessage!=""){
			newMessage.forEach(function(messageAtomic){
				rows.push(
					<Paper key={i} style={style} zDepth={2} children={<DynamicAtomicBinding history={this.props.history} questions={messageAtomic} />} />
					)
				i++
			}.bind(this))
		}
		else {
			rows.push(
				<div key={i} className="empty">
					<img src="img/empty.png" />
					<p>您的动态空空如也，快去解锁一些答主吧~</p>
				</div>
				)
		}
		return (
			<div>
				<div>{rows}</div>
				{this.showLoading()}
			</div>

			)
	}
}