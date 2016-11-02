import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './uploadImg.css'

var appServer = 'https://www.opt.com.cn/getSTS';
var bucket = 'qiushi-oss';
var region = 'oss-cn-hangzhou';
var urllib = window.OSS.urllib;
var Buffer = window.OSS.Buffer;
var OSS = window.OSS.Wrapper;
var STS = window.OSS.STS;

var applyTokenDo = function (func) {
  var url = appServer;
  return urllib.request(url, {
    method: 'GET',
  }).then(function (result) {
    var creds = JSON.parse(result.data);
    var client = new OSS({
      region: region,
      accessKeyId: creds.AccessKeyId,
      accessKeySecret: creds.AccessKeySecret,
      stsToken: creds.SecurityToken,
      bucket: bucket
    });

    return func(client);
  });
};
var uploadFile = function (client) {
    var file = document.getElementById('imgFile').files[0];
    // var key = document.getElementById('object-key-file').value.trim() || 'object';
    var key = localStorage.getItem('userId') +"|"+ new Date().getTime() +"|"+ 'index.jpg';
    console.log(file.name + ' => ' + key);

    return client.multipartUpload(key, file, {
      progress: progress
    }).then(function (res) {
        console.log('upload success: %j', res);
        // return listFiles(client);
      });
};
var progress = function (p) {
  return function (done) {
    var bar = document.getElementById('progress-bar');
    bar.style.width = Math.floor(p * 100) + '%';
    bar.innerHTML = Math.floor(p * 100) + '%';
    done();
  }
};
export default class UploadImg extends Component{
 constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '',imagePreviewName: ''};
  }

  componentDidMount(){

  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    

    applyTokenDo(uploadFile);
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
          <div className="progress">
            <div id="progress-bar" className="progress-bar" style={{minWidth: "2em"}}>
              0%
            </div>
          </div>
          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>上传</button>
        </form>
        
      </div>
    )
  }
}