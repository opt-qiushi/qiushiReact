import React, { Component } from 'react'
import GMTtoTime from './gmtToTime'
import './commentAtomic.css'

export default class CommentAtomic extends Component{
	render(){
		const {comments}=this.props
		var rows=[];
        var i=1;
        comments.forEach(function(coMent){
            rows.push(
                <div key={i} className="commentBox-0">
                  <div className="commentBox-head">
                    <div className="commentImageS">
                      <img src={coMent.from.avatar} />
                    </div>
                    <div className="commentBox-0-1">
                      <div className="commentBox-0-1-0">{coMent.from.name}</div>
                      <div className="commentBox-0-1-1">{GMTtoTime(coMent.createdAt)}</div>
                    </div>
                    <div className="commentBox-0-2">
                      <img ref="like" src="./img/question_detail_like.png" />
                      <div className="commentBox-0-2-1">{coMent.likeNum}</div>
                    </div>
                  </div>
                  <div className="commentBox-1">{coMent.content}</div>
                </div>
              );
            i++;
        });
		return (
			<div className="commentBox">
              <div className="commentTitle">全部评论</div>
              {rows}
            </div>
			)
	}
}