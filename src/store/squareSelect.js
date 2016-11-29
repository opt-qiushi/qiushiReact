const initState = {
	answer:[]
}

export default function squareSelect(state = initState, action){
	switch(action.type){
		case "addSquareSelect":
			var temp=state.answer.concat(action.data)
			state.answer=temp
			console.log(state)
			return state
		default:
			return state
	}
}