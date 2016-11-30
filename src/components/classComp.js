import React, { Component } from 'react'
import "./classComp.css"
import FlatButton from 'material-ui/FlatButton';
import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'


const buttonStyle={
  height: '80px',
  width:'25%',
  float: 'left',
  textAlign: 'center',
  minWidth: 'none'
}

export default class classComp extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(){
            this.props.saveCategory(this.props.categoryName)
            setTimeout(function(){
              this.props.history.push("/category")
            }.bind(this),500)
  }

	render(){
		const {categoryName, categoryUrl}=this.props
		return (
  			     <FlatButton className="fourClasses-1" style={buttonStyle} onTouchTap={this.handleClick} >
                   <div className="circle">
                    <div><img src={categoryUrl} className="picture"/></div>
                    <div className="name">
                      <span>{categoryName}</span>
                    </div>
                   </div>
             </FlatButton>
		)
	}
}