const initState=""

export default function questionDetail (state=initState, action){
	switch(action.type){
		case "getQuestionDetail":
				return Object.assign({}, state, 
					action.data
				)
		default:
				return state
	}
}

