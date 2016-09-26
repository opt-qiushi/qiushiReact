const initState=""

export default function commentDetail (state=initState, action){
	switch(action.type){
		case "getCommentDetail":
				state=action.data
				return state
		default:
				return state
	}
}

