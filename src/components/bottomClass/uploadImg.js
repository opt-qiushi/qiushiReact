import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie'
import io from '../../server'
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
  var userId = localStorage.getItem('userId');
  var toServer = 'img/' + userId;
  return urllib.request(url, {
    method: 'POST',
    data: { prefix:toServer}
  }).then(function (result) {
    var creds = JSON.parse(result.data);
    var opt = {maxAge:60*15}
    cookie.save('creds',creds,opt)
    var client = new OSS({
      region: region,
      accessKeyId: creds.AccessKeyId,
      accessKeySecret: creds.AccessKeySecret,
      stsToken: creds.SecurityToken,
      bucket: bucket
    });
    console.log(client)
    // const Now = new Date().getTime() + 60*1000*15;
    
    return func(client);
  });
};
var uploadFile = function (client) {
    var file = document.getElementById('imgFile').files[0];
    // var key = document.getElementById('object-key-file').value.trim() || 'object';
    var key = 'img/' + localStorage.getItem('userId') +"|"+ new Date().getTime() +"|"+ 'index.jpg';
    // key = 'img/' + localStorage.getItem('userId') +　"*"
    // key = "1234";
    console.log(file.name + ' => ' + key);

    return client.multipartUpload(key, file, {
      progress: progress
    }).then(function (res) {
        console.log('upload success: %j', res);
        console.log(res.name)
        //回调函数更新数据库


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
    this.startRecord = this.startRecord.bind(this)
    this.stopRecord = this.stopRecord.bind(this)
    this.playVoice = this.playVoice.bind(this)
    this.uploadVoice = this.uploadVoice.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.deleteTest = this.deleteTest.bind(this)
    this.id = ''
  }

  componentWillMount(){
    io.socket.get("/config",{targetUrl:localStorage.getItem('fromUrl')},(result, jwr) =>{
      // result.debug = true;
      wx.config(result)
      wx.ready(function(){

      });
      wx.error(function(){
        var url = location.href.split('#')[0];
        localStorage.setItem('fromUrl',url)


        io.socket.get("/config",{targetUrl:localStorage.getItem('fromUrl')},(result, jwr) =>{
          // result.debug = true;
          wx.config(result)
          wx.ready(function(){

          });
          wx.error(function(){
            console.log('enter error two')
          });  
        });
      });  
    });      
  }
  start(){
    alert('start')
    this.refs.audio.play();
    //this.refs.audio.duration
  }
  stop(){
    alert('stop')
    this.refs.audio.pause();
  }
  //开始录音接口
  startRecord(e){
    e.preventDefault();
    alert("Start Record")
    wx.startRecord();
  }
  //停止录音接口
  stopRecord(e){
    e.preventDefault();
    alert("Stop Record");
    var that = this;
    wx.stopRecord({
      success: function (res) {
          var localId = res.localId;
          that.id = localId;
          alert(that.id)
      }
    });
  }
  //监听录音自动停止接口
  onVoiceRecordEnd(){
    wx.onVoiceRecordEnd({
    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
      complete: function (res) {
          var localId = res.localId; 
      }
    });
  }
  //播放语音接口
  playVoice(e){
    e.preventDefault();
    var id = this.id;
    wx.playVoice({
      localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }
  //暂停播放接口
  pauseVoice(e){
    e.preventDefault();
    var id = this.id;
    wx.pauseVoice({
      localId: id // 需要暂停的音频的本地ID，由stopRecord接口获得
    });
  }
  //停止播放接口
  stopVoice(){
    wx.stopVoice({
      localId: '' // 需要停止的音频的本地ID，由stopRecord接口获得
    });
  }
  //监听语音播放完毕接口
  onVoicePlayEnd(){
    wx.onVoicePlayEnd({
      success: function (res) {
          var localId = res.localId; // 返回音频的本地ID
      }
    });
  }
  //上传语音接口
  uploadVoice(e){
    e.preventDefault();
    var id = this.id;
    alert('开始上传')
    wx.uploadVoice({
      localId: id, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
      var serverId = res.serverId; // 返回音频的服务器端ID
      alert('上传成功')
      io.socket.post('/voice',{id:serverId,name:'juejuejuejuejue'},(result,jwr)=>{
          alert('voice接口访问成功')
        })
      }
    });
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    if(cookie.load('creds')){
      var creds = cookie.load('creds')
      var bucket = 'qiushi-oss';
      var region = 'oss-cn-hangzhou';
      var client = new OSS({
      region: region,
      accessKeyId: creds.AccessKeyId,
      accessKeySecret: creds.AccessKeySecret,
      stsToken: creds.SecurityToken,
      bucket: bucket
      });
      uploadFile(client)
      
    }else{
      applyTokenDo(uploadFile);
    }

    
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
  deleteTest(){
      var creds = cookie.load('creds');
      var bucket = 'qiushi-oss';
      var region = 'oss-cn-hangzhou';
      var client = new OSS({
      region: region,
      accessKeyId: creds.AccessKeyId,
      accessKeySecret: creds.AccessKeySecret,
      stsToken: creds.SecurityToken,
      bucket: bucket
      });
      client.delete('img/57e1f7c527fc2e2b5edc1953|1479976308470|index.jpg').then(function (res) {
        console.log(res)
      });
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
        <span onTouchTap={this.deleteTest}>删除OSS测试</span>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <div><label htmlFor="imgFile" className="add-img">+</label></div>
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
        <button onTouchTap={this.startRecord}>开始录音</button>
        <button onTouchTap={this.stopRecord}>停止录音</button>
        <button onTouchTap={this.playVoice}>播放录音</button>
        <button onTouchTap={this.uploadVoice}>上传录音</button>
        <div>
          <audio src="http://qiushi-oss.oss-cn-hangzhou.aliyuncs.com/voices/id.mp3" ref="audio">
            Don't support audio
          </audio>
          <span onTouchTap={this.start}>开始播放</span>
          <span onTouchTap={this.stop}>暂停播放</span>
        </div>
        
      </div>
    )
  }
}