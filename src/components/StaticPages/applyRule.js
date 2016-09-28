import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import './applyRule.css'
import * as actions  from '../../actions/homepage'
//bindActionCreators(actions, dispatch)
export default class ApplyRule extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.notShouye();
	}
	render(){
		return(
			<div className="applyRule">
				<div className="head">
				    <img src="./img/apply-rule-head.png" alt=""/>
				</div>
				<div className="main-content">
				    <section className="item">
				        <div className="white-block"></div>
				        <div className="rule-inf">申请认证用户要求：</div>
				        <div className="rule-inf">
				          如果你想进入求士专业板块，如果你在该领域有一定专业性 / 无论社团主席or美食达人，均可直接联系客服提交申请直接进入审核，通过申请即有机会出现在求士首页。
				        </div>
				    </section>
				    <section className="item">
				        <div className="white-block"></div>
				        <div className="rule-inf">关注求士服务号（见底栏），有任何问题提问即可。</div>
				        <div className="rule-inf">
				          如果你想进入求士专业板块，如果你在该领域有一定专业性 / 无论社团主席or美食达人，均可直接联系客服提交申请直接进入审核，通过申请即有机会出现在求士首页。
				        </div>
				        <div className="rule-inf">
				            <div className="category">
				            申请板块包括：<br/>
				            社团、学术、创业、美食、电脑、美妆、摄影及其它
				            </div>
				        </div>
				    </section>
				    <section className="item">
				        <div className="white-block"></div>
				        <div className="rule-inf">求士认证板块将极大增强用户公信力 / 并有可能获得求士人气用户等页面推荐进而增加自己的粉丝数和板块影响力。</div>
				    </section>
				    <section className="item">
				        <div className="white-block"></div>
				        <div className="rule-inf">任何建议欢迎再[我要反馈]一栏进行用户反馈意见提交。</div>
				        <br/>
				        <br/>
				        <div className="rule-inf">感谢您的关注！</div>
				    </section>
				    <div className="erweima">
				        <img src="./img/二维码.jpg" alt=""/>
				    </div>
				</div>
			</div>
		)
	}
}