import {QIUSHI, GUANZHU, DONGTAI, WODE, SHOUYE, NOTSHOUYE} from '../constants/homepage' 
import * as colors from '../constants/color'

const initState = {
}

export default function userInfo(state = initState, action){
	switch(action.type){
		case "getUserInformation":
			return Object.assign({}, state, 
					action.data
				)
		default:
			return state
	}
}