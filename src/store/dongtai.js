import {QIUSHI, GUANZHU, DONGTAI, WODE, SHOUYE, NOTSHOUYE} from '../constants/homepage' 
import * as colors from '../constants/color'

const initState ={ 
	status:1,
	question: [{
		createdAt:"",
		question:"",
		answer:"",
		collectNum:"",
		commentNum:"",
		watchNum:"",
		addQuestions:[{
			question:"",
			answer:""
		}],
		to:{
			avatar:"",
			name:""
		}
	}]
}

export default function dongtai(state = initState, action){
	switch(action.type){
		case "getDongtai":
			return Object.assign({}, state, 
					action.data
				)
		case "getDongtaiMore":
			var temp=state.question.concat(action.data.question)
			return Object.assign({}, state,{question:temp}
				)
		default:
			return state
	}
}