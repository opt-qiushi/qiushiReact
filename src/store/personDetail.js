const initState={
	like:0,
	ableToSee:0,
	detail:{
		followers:[],
		answerNum:0,
		avatar:"img/vipDetail/hosthead.png",
		fansNum:0,
		introduction:"测试",
		name:"",
		questionNum:0,
		title:"",
		id:"5785b884ca01f6263d839178",
		qiushiQuestions:[]
	},
	total_pages:1,
	question: []
}

export default function personDetail (state=initState, action){
	switch(action.type){
		case "getCurrentDetail": 
				return Object.assign({}, state, 
					action.data
				)
		case "loadingMoreQuestions":
				var temp=state.question.concat(action.data.question)
				return Object.assign({}, state, {
						question: temp
					}
				)
		default:
				return state
	}
}

