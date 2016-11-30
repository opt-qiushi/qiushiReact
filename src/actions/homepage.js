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

export function getCollection(state){
	return {
		type: "getCollection",
		data: state
	}
}

export function getCollectionMore(state){
	return {
		type: "getCollectionMore",
		data: state
	}
}

export function changeCurrentSquare(state){
	return {
		type: "changeCurrentSquare",
		data: state
	}
}

export function addCurrentSquare(state){
	return {
		type: "addCurrentSquare",
		data: state
	}
}

export function applySquare(state){
	return{
		type: "applySquare",
		data: state
	}
}

export function addSquare(state){
	return{
		type: "addSquare",
		data: state
	}
}

export function adjustDataset(first , second){
	return {
		type: "adjustDataset",
		data: {from: first, to: second}
	}
}

export function addSquareSelect(state){
	return {
		type: "addSquareSelect",
		data: state
	}
}

export function deleteSquareSelect(data){
	return {
		type: "deleteSquareSelect",
		data: data
	}
}

export function changeNumber(data){
	return {
		type: "changeNumber",
		data: data
	}
}

export function clearSelectData(){
	return {
		type: "clearSelectData"
	}
}

export function setSelectData(data){
	return {
		type: "setSelectData",
		data: data
	}
}