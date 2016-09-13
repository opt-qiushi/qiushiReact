
const initState={
	notQuestions: [],
	yesQuestions: [],
	ownQuestions: []
}

export default function myQuestions (state=initState, action){
	switch(action.type){
		case "getNotQuestions": 
				return Object.assign({}, state, {
					notQuestions: action.data
				})
		case "getNotQuestionsMore": 
				var temp=state.notQuestions.concat(action.data)
				return Object.assign({}, state, {
					notQuestions: temp
				})
		case "getYesQuestions": 
				return Object.assign({}, state, {
					yesQuestions: action.data
				})
		case "getYesQuestionsMore": 
				var temp=state.yesQuestions.concat(action.data)
				return Object.assign({}, state, {
					yesQuestions: temp
				})
		case "getOwnQuestions": 
				return Object.assign({}, state, {
					ownQuestions: action.data
				})
		case "getOwnQuestionsMore": 
				var temp=state.ownQuestions.concat(action.data)
				return Object.assign({}, state, {
					ownQuestions: temp
				})
		default:
				return state
	}
}