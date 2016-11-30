const initState = {
	defaultData:{
		deadline:"-",
		"from":{
			name: ""
		},
		reward:"-",
		answerNum:"-",
		question:"-",
		answer:[]
	},
	selectData: [],
	adoptNum: 0
}

export default function currentSquare(state = initState, action){
	switch(action.type){
		case "changeCurrentSquare":
			var temp={
				defaultData: action.data
			}
			return Object.assign({}, state, 
					temp
				)
		case "addCurrentSquare":
			var temp=state.defaultData.answer.concat(action.data)
			state.defaultData.answer=temp
			return state
		// case "adjustDataset":
		// 	var temp=state.answer.splice(action.data.to, 0, state.answer.splice(action.data.from, 1)[0])
		// 	state.answer=temp
		// 	return state
		case "addSquareSelect":
			var temp=state.selectData.concat(action.data)
			// state.selectData=temp
			var num=state.adoptNum+1
			// state.adoptNum=num
			var ok={
				selectData:temp,
				adoptNum: num
			}
			return Object.assign({}, state, 
					ok
				)
		case "deleteSquareSelect":
			/* 删除 */
			var temp=state.selectData.concat()
			temp.forEach(function(selectAtomic,i){
				// console.log(i, selectAtomic.id, action.data.id)
				if(selectAtomic.id==action.data.id){
					temp.splice(i,1)
				}
			})
			var num=state.adoptNum-1
			var ok={
				selectData: temp,
				adoptNum: num
			}
			return Object.assign({}, state, 
					ok
				)
		default:
			return state
	}
}