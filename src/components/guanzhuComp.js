import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import GuanzhuAtomic from '../containers/guanzhuAtomic'
import "./guanzhuComp.css"
import io from "../server"



export default class GuanzhuComp extends Component{
  constructor(props){
    super(props)
  }


  componentWillMount(){
    this.props.changeGuanzhu()
    this.props.shouye()
    window.scrollTo(0,0)
    io.socket.get('/professional/getFollowing', {id: this.props.userId}, (foList, jwr) => {
      this.props.getGuanzhu(foList)
    })
  }

	render(){
  //       const {newFollows}=this.props
  //         var rows_left=[]
  //         var rows_right=[]
  //         var num=0
  //         newFollows.forEach(function(focusPerson){
  //           num++;
  //           if(num%2==1){
  //             rows_left.push(
  //               <div key={num} className="focus_out_right">
  //                 <div className="focus_head" >
  //                   <img src={focusPerson.headimgurl} />
  //                   <div className="focus_bottom row" >
  //                     <div className="focus_left">
  //                       <div className="focus_name">{focusPerson.name}</div>
  //                       <div className="focus_title">{focusPerson.title}</div>
  //                     </div>
  //                     <div className="focus_right">
  //                       <div className="focus_issue">
  //                         <p>{focusPerson.answerNum}</p>
  //                         <p>回答</p>
  //                       </div>
  //                       <img src="img/focus_decoration.gif"/>
  //                       <div className="focus_fan">
  //                         <p>{focusPerson.fansNum}</p>
  //                         <p>粉丝</p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           }else{
  //             rows_right.push(
  //               <div key={num} className="focus_out_right">
  //                 <div className="focus_head" >
  //                   <img src={focusPerson.headimgurl} />
  //                   <div className="focus_bottom row" >
  //                     <div className="focus_left">
  //                       <div className="focus_name">{focusPerson.name}</div>
  //                       <div className="focus_title">{focusPerson.title}</div>
  //                     </div>
  //                     <div className="focus_right">
  //                       <div className="focus_issue">
  //                         <p>{focusPerson.answerNum}</p>
  //                         <p>回答</p>
  //                       </div>
  //                       <img src="./img/focus_decoration.gif"/>
  //                       <div className="focus_fan">
  //                         <p>{focusPerson.fansNum}</p>
  //                         <p>粉丝</p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           }
  //         }.bind(this));
		// return (
		// 	     <div>
  //             <div>
  //               <div className="rows_left">{rows_left}</div>
  //               <div className="rows_right">{rows_right}</div>
  //             </div>
  //             <div className="blankSpace"></div>
  //           </div>
		// 	)
      const {newFollows}=this.props
      var rows=[]
      var i=1
      if (newFollows[0]){
        newFollows.forEach(function(focusPerson){
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
          <p>您的关注空空如也，快去关注一些答主吧~</p>
        </div>
        )
     }
      return (
          <List>
            {rows}
            
          </List>
        )
	}
}