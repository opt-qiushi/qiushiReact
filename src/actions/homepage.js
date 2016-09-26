import * as flags from '../constants/homepage'

export function changeQiushi(){
	return {type: flags.QIUSHI}
}

export function changeGuanzhu(){
	return {type: flags.GUANZHU}
}

export function changeDongtai(){
	return {type: flags.DONGTAI}
}

export function changeWode(){
	return {type: flags.WODE}
}

export function notShouye(){
	return {type: flags.NOTSHOUYE}
}

export function shouye(){
	return {type: flags.SHOUYE}
}

export function saveGuestId(str){
	return { 
		type: "saveGuestId",
		data: str
	}
}

export function saveQuestionId(str){
	return { 
		type: "saveQuestionId",
		data: str
	}
}

export function saveCategory(context){
	return { 
		type: "saveCategory",
		data: context
	}
}

export function loadingMoreQuestions(state){
	return {
		type: "loadingMoreQuestions",
		data: state
	}
}

export function galleryUpdate(state){
	return { 
		type: "galleryUpdate",
		data: state
	}
}

export function galleryLoadingMore(state){
	return { 
		type: "galleryLoadingMore",
		data: state
	}
}

export function getCurrentDetail(state){
	return { 
		type: "getCurrentDetail",
		data: state
	}
}

export function getQuestionDetail(state){
	return {
		type: "getQuestionDetail",
		data: state
	}
}

export function getCommentDetail(state){
	return {
		type: "getCommentDetail",
		data: state
	}
}

export function getDongtai(state){
	return {
		type: "getDongtai",
		data: state
	}
}

export function getDongtaiMore(state){
	return {
		type: "getDongtaiMore",
		data: state
	}
}

export function getGuanzhu(state){
	return {
		type: "getGuanzhu",
		data: state
	}
}

export function getNotQuestions(state){
	return {
		type: "getNotQuestions",
		data: state
	}
}

export function getNotQuestionsMore(state){
	return {
		type: "getNotQuestionsMore",
		data: state
	}
}

export function getYesQuestions(state){
	return {
		type: "getYesQuestions",
		data: state
	}
}

export function getYesQuestionsMore(state){
	return {
		type: "getYesQuestionsMore",
		data: state
	}
}

export function getOwnQuestions(state){
	return {
		type: "getOwnQuestions",
		data: state
	}
}

export function getOwnQuestionsMore(state){
	return {
		type: "getOwnQuestionsMore",
		data: state
	}
}

export function getUserInformation(state){
	return {
		type: "getUserInformation",
		data: state
	}
}