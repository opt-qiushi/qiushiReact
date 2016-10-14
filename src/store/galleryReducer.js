
const initState={
	currentPage: 1,
	totalPages: 1,
	professionals:[]
}

export default function galleryReducer (state=initState, action){
	switch(action.type){
		case "galleryUpdate": 
				return Object.assign({}, state, {
					professionals: action.data.professionals,
					totalPages: action.data.total_pages,
					currentPage: 1
				})
		case "galleryLoadingMore":
				var temp=state.professionals.concat(action.data)
				var temp2=state.currentPage+1
				return Object.assign({}, state, {
						professionals: temp,
						currentPage: temp2
					}
				)
		default:
				return state
	}
}