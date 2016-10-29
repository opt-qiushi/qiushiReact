import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './uploadImg.css'
export default class UploadImg extends Component{
	// constructor(props){
 //    	super(props)
 //    	this.state = {imgArray:[],imgSrc:[]}
 //    	this.handleChange=this.handleChange.bind(this)
 // 	}
 // 	handleChange(){
 // 		// console.log(this.refs.imgFile.files)
 // 		var temp = this.state.imgArray.concat()
 // 		// var temp = this.state.imgArray
 // 		temp.push(this.refs.imgFile.files[0])
 // 		this.setState({imgArray:temp})
 // 		var reader = new FileReader();
	//  		reader.onload = () =>{
	//  			console.log("enter reder.onload")
	//  			var temp = this.state.imgSrc.concat()
	//  			temp.push(reader.result)
	//  			this.setState({imgSrc:temp})
	//  		}
	//  		// reader.readAsDataURL(this.refs.imgFile.files[0])
	//  	reader.readAsDataURL(this.state.imgArray[0])
 // 	}
 // 	render(){
 // 		var rows = []
 // 		var imgArray = this.state.imgArray;
 // 		if(imgArray.length == 0){
 // 			rows.push(<div key="0">请选择图片</div>)
 // 		}
 // 		var imgArea = [];
 // 		if(this.state.imgSrc.length>0){
 // 			imgArea.push(
 // 				<div key="1">
 // 					<img src={this.state.imgSrc[0]}/>
 // 				</div>
 // 			)
 // 		}else{
 // 			imgArea.push(<div key="-1"></div>)
 // 		}
 // 		return (
 // 			<div>
 // 				<label htmlFor="imgFile">选择图片</label>
 // 				<input type="file" id="imgFile" accept="image/*" ref="imgFile" onChange={this.handleChange} multiple />
 // 				<div className="img-area">{imgArea}</div>
 // 				<FlatButton htmlFor="imgFile" label="上传"/>
 // 				{rows}
 // 			</div>
 			
 // 		)
 // 	}
 constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '',imagePreviewName: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({"imagePreviewName":file.name})
    reader.onloadend = () => {

      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div><img src={imagePreviewUrl} /><span>{this.state.imagePreviewName}</span></div>);
    } else {
      $imagePreview = (<div className="previewText">还未选择图片</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <div><label htmlFor="imgFile">选择图片</label></div>
          <input className="fileInput" type="file" id="imgFile" onChange={(e)=>this._handleImageChange(e)} />
          <div className="imgPreview">
	        {$imagePreview}
	      </div>
          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>上传</button>
        </form>
        
      </div>
    )
  }
}