import {QIUSHI, GUANZHU, DONGTAI, WODE, SHOUYE, NOTSHOUYE} from '../constants/homepage' 
import * as colors from '../constants/color'

const initState = {
	visitFlag: 0,
	isHome: 1,
	category: "学术",
	guestId: "5781f3958d76bd37452d8e63",
	questionId: "",
	iconInfo: [
		{
			img: 'img/index-on.png',
			color: colors.OPTGREEN
		},
		{
			img: 'img/focus.png',
			color: colors.GRAYWHITE
		},
		{
			img: 'img/dynamic.png',
			color: colors.GRAYWHITE
		},
		{
			img: 'img/my.png',
			color: colors.GRAYWHITE
		}
	]
}

export default function status(state = initState, action){
	switch(action.type){
		case QIUSHI:
			return Object.assign({}, state, {
		        visitFlag: 0,
		        iconInfo: [
					{
						img: 'img/index-on.png',
						color: colors.OPTGREEN
					},
					{
						img: 'img/focus.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/dynamic.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/my.png',
						color: colors.GRAYWHITE
					}
				]
		      })

		case GUANZHU:
			return Object.assign({}, state, {
		        visitFlag: 1,
		        iconInfo: [
					{
						img: 'img/index.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/focus-on.png',
						color: colors.OPTGREEN
					},
					{
						img: 'img/dynamic.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/my.png',
						color: colors.GRAYWHITE
					}
				]
		      })

		case DONGTAI:
			return Object.assign({}, state, {
		        visitFlag: 2,
		        iconInfo: [
					{
						img: 'img/index.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/focus.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/dynamic-on.png',
						color: colors.OPTGREEN
					},
					{
						img: 'img/my.png',
						color: colors.GRAYWHITE
					}
				]
		     })

		case WODE:
			return Object.assign({}, state, {
		        visitFlag: 3,
		        iconInfo: [
					{
						img: 'img/index.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/focus.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/dynamic.png',
						color: colors.GRAYWHITE
					},
					{
						img: 'img/my-on.png',
						color: colors.OPTGREEN
					}
				]
		     })
		case SHOUYE:
			return Object.assign({}, state, {
				isHome:1
			})
		case NOTSHOUYE:
			return Object.assign({}, state, {
				isHome:0
			})
		case "saveGuestId":
			return Object.assign({}, state, {
				guestId: action.data
			})
		case "saveCategory":
			return Object.assign({}, state, {
				category: action.data
			})
		case "saveQuestionId":
			return Object.assign({}, state, {
				questionId: action.data
			})
		default:
			return state
	}
}