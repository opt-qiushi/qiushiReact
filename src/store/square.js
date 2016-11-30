const initState = [
	{deadline:"-",
	"from":{
		name: ""
	},
	reward:"-",
	answerNum:"-",
	flag: true,
	question:"-"}
]
var toBeDelete = {minute:"290",
	userName:"都是",
	award:"10",
	answerNum:"0",
	question:"高考是人生的起点？"}
export default function square(state = initState, action){
	switch(action.type){
		case "applySquare":
			return action.data
		case "addSquare":
			var temp=state.concat(action.data)
			return temp
		default:
			return state
	}
}