import {QIUSHI, GUANZHU, DONGTAI, WODE, SHOUYE, NOTSHOUYE} from '../constants/homepage' 
import * as colors from '../constants/color'

const initState ={ 
	following:[{}]
}

export default function guanzhu(state = initState, action){
	switch(action.type){
		case "getGuanzhu":
			return Object.assign({}, state, 
					action.data
				)
		default:
			return state
	}
}