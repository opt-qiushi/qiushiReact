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
		default:
			return state
	}
}