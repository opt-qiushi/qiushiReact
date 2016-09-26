import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import io from '../server'
import GuanzhuAtomic from '../containers/guanzhuAtomic'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress'
import './guanzhuComp.css'

const circularStyle={
  textAlign: "center"
}

export default class Category extends Component{
	constructor(props){
		super(props)
		this.state={
			category:[],
			pages:1,
			totalPages:1,
			isInfiniteLoading: false,
			firstVisit: true
		}
		// this.handleInfiniteLoad=this.handleInfiniteLoad.bind(this)
    	this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
    	this.handleScrollToBottom=this.handleScrollToBottom.bind(this)
    	this.showLoading=this.showLoading.bind(this)
    	this.handleScroll=this.handleScroll.bind(this)

	}

	handleScroll(){
		var scrollviewOffsetY = document.body.scrollTop
		var scrollviewFrameHeight = document.body.clientHeight
		var scrollviewContentHeight = document.body.scrollHeight

		var sum = scrollviewOffsetY+scrollviewFrameHeight
		if(sum >= scrollviewContentHeight-5 && !this.state.isInfiniteLoading){
			return this.handleScrollToBottom()
		}
		return 
	}

	componentDidMount(){
		this.props.notShouye()
		window.scrollTo(0,0)
		if(this.state.firstVisit){
			io.socket.get('/professional/getByClass', {class:this.props.category}, (result, jwr) => {
		          this.setState({category: result.professionals, totalPages: result.total_pages, pages: 2, firstVisit: false})
		    })
		}
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
  }

	handleScrollToBottom(){
		if(this.state.pages==1) return 
        this.setState({
            isInfiniteLoading: true
        })
        if(this.state.pages > this.state.totalPages){
          this.setState({isInfiniteLoading: false})
          return 
        }
        io.socket.get('/professional/getByClass', {class:this.props.category, page: this.state.pages}, (result, jwr) => {
          setTimeout(function() {
            var tempCate=this.state.category.concat(result.professionals)
            var temp=this.state.pages+1
            this.setState({isInfiniteLoading: false, pages: temp, category: tempCate})
          }.bind(this), 1500)
        })
	}

	// handleInfiniteLoad(){
	// 	console.log(this.state.pages)
	// 	if(this.state.pages==1) return 
 //        this.setState({
 //            isInfiniteLoading: true
 //        })
 //        if(this.state.pages > this.state.totalPages){
 //          this.setState({isInfiniteLoading: false})
 //          return 
 //        }
 //        io.socket.get('/professional/getByClass', {class:this.props.category, page: this.state.pages}, (result, jwr) => {
 //          setTimeout(function() {
 //            var tempCate=this.state.category.concat(result.professionals)
 //            var temp=this.state.pages+1
 //            this.setState({isInfiniteLoading: false, pages: temp, category: tempCate})
 //          }.bind(this), 1500)
 //        })
 //  }

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

    showLoading(){
    	if(this.state.isInfiniteLoading) return this.elementInfiniteLoad()
    	else return 
    }

	render(){
		var rows=[]
		var i=1
      	if (this.state.category!=""){
	        this.state.category.forEach(function(focusPerson){
	          rows.push(
	              <GuanzhuAtomic key={i} focusPerson={focusPerson} history={this.props.history}/>
	            )
	          i++
	        }.bind(this))
     	}
     	else{
     		rows.push(
       	 	<div key={i} className="empty">
         	 <img src="img/empty.png" />
         	 <p>该页面空空如也~</p>
        	</div>
        	)
    	 }
		return (
			<List>
				<Subheader>{this.props.category}</Subheader>
				<Divider />
				{/*<Infinite elementHeight={72}
				                          onInfiniteLoad={this.handleInfiniteLoad}
				                          infiniteLoadBeginEdgeOffset={0}
				                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
				                         isInfiniteLoading={this.state.isInfiniteLoading}
				                         useWindowAsScrollContainer
				                         >
								{rows}
								</Infinite>*/}
				<div>{rows}</div>
				{this.showLoading()}
			</List>
			)
	}
}