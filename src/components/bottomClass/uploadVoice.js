import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie'
import io from '../../server'

export default class UploadVoice extends Component{
 constructor(props) {
    super(props);
    this.startRecord = this.startRecord.bind(this)
    this.stopRecord = this.stopRecord.bind(this)
    this.playVoice = this.playVoice.bind(this)
    this.uploadVoice = this.uploadVoice.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
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
      io.socket.post('/voice',{id:serverId,answerId:''},(result,jwr)=>{
          alert('voice接口访问成功')
        })
      }
    });
  }


  render() {
    return (
      <div>
        <button onTouchTap={this.startRecord}>开始录音</button>
        <button onTouchTap={this.stopRecord}>停止录音</button>
        <button onTouchTap={this.playVoice}>播放录音</button>
        <button onTouchTap={this.uploadVoice}>上传录音</button>
        <audio src="https://www.opt.com.cn/root/qiushi/qiushi/qiushiApp/.tmp/uploads/voices/id.arm" ref="audio">
          Don't support audio
        </audio>
      </div>
    )
  }
}