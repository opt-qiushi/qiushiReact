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

export default class Collection extends Component{
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
		// this.props.changeDongtai()
		this.props.notShouye()
		window.scrollTo(0,0)
		io.socket.get('/professional/getCollects', {id: localStorage.getItem('userId')}, (result, jwr) => {
              console.log("result:")
              console.log(result)
              this.props.getCollection(result)
              this.setState({totalPages:result.total_pages, pages: 2})
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
        io.socket.get('/professional/getCollects', {id: localStorage.getItem('userId'), page: this.state.pages}, (result, jwr) => {
          setTimeout(function() {
          	this.props.getCollectionMore(result)
            var temp=this.state.pages+1
            this.setState({isInfiniteLoading: false, pages: temp})
          }.bind(this), 1500)
        })
  	}

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

	render(){
		const {qList}=this.props
		var rows=[]
		var i=1
		if(qList && qList.length >0){
			qList.forEach(function(qListAtomic){
				rows.push(
					<Paper key={i} style={style} zDepth={2} children={<DynamicAtomicBinding history={this.props.history} questions={qListAtomic} />} />
					)
				i++
			}.bind(this))
		}
		else {
			rows.push(
				<div key={i} className="empty">
					<img src="./img/empty.png" />
					<p>您的收藏空空如也，快去收藏一些答主吧~</p>
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