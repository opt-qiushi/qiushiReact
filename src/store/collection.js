// import {QIUSHI, GUANZHU, DONGTAI, WODE, SHOUYE, NOTSHOUYE} from '../constants/homepage' 
// import * as colors from '../constants/color'

const initState = {
	questionList:[]
}

export default function userInfo(state = initState, action){
	switch(action.type){
		case "getCollection":
			// var temp = state.questionList.concat(action.data)
			return Object.assign({}, state, 
					{questionList:action.data}
				)
		case "getCollectionMore":
			var temp=state.questionList.concat(action.data)
			return Object.assign({}, state,{questionList:temp}
				)
		// case "addCollection":
		// 	var temp = state.questionList.push(action.data)
		// 	return Object.assign({}, state, 
		// 			state.questionList.push(action.data)
		// 		)
		// case "removeCollecton":
		// 	return Object.assign({}, state, 
		// 			action.data
		// 		) 
		default:
			return state
	}
}