import React, { Component } from 'react'
import "./classComp.css"
import FlatButton from 'material-ui/FlatButton';
import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'


const buttonStyle={
  height: '100%',
  minWidth: '10px',
  width:'25%',
  display: 'inline',
  float: 'left',
  textAlign: 'center',
  paddingTop: '10px',
  paddingLeft: '15px',
  paddingRight: '15px',
  lineHeight: '20px'
}

export default class classComp extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(){
            this.props.saveCategory(this.props.categoryName)
            setTimeout(function(){
              this.props.history.push("/category?" + "category=xueshu")
            }.bind(this),500)
  }

	render(){
		const {categoryName, categoryUrl}=this.props
		return (
  			     <FlatButton className="fourClasses-1" style={buttonStyle} onTouchTap={this.handleClick} >
                   <div className="circle"><img src = {categoryUrl} /></div>
                   <font className="fourClasses-2" >{categoryName}</font>
             </FlatButton>
		)
	}
}