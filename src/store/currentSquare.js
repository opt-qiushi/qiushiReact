const initState = {
	deadline:"-",
	"from":{
		name: ""
	},
	reward:"-",
	answerNum:"-",
	question:"-"
}

export default function currentSquare(state = initState, action){
	switch(action.type){
		case "changeCurrentSquare":
			return Object.assign({}, state, 
					action.data
				)
		case "addCurrentSquare":
			var temp=state.answer.concat(action.data)
			state.answer=temp
			return state
		case "adjustDataset":
			var temp=state.answer.splice(action.data.to, 0, state.answer.splice(action.data.from, 1)[0])
			state.answer=temp
			return state
		default:
			return state
	}
}