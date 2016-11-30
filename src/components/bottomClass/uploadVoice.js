import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie'
import io from '../../server'
import './uploadVoice.css'
const labelStyle = {
  color: "white"
}
const btnStyle = {

}
export default class UploadVoice extends Component{
 constructor(props) {
    super(props);
    this.state = {status:0}
    this.startRecord = this.startRecord.bind(this)
    this.stopRecord = this.stopRecord.bind(this)
    this.onVoiceRecordEnd = this.onVoiceRecordEnd.bind(this)
    this.onVoicePlayEnd = this.onVoicePlayEnd.bind(this)
    this.playVoice = this.playVoice.bind(this)
    this.pauseVoice = this.pauseVoice.bind(this)
    this.uploadVoice = this.uploadVoice.bind(this)
    this.showArea = this.showArea.bind(this)
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
  //开始录音接口
  startRecord(e){
    e.preventDefault();
    alert("Start Record")
    wx.startRecord();
    this.setState({status:1})
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
          alert('that.id' + that.id)
          that.setState({status:2})
      }
    });
  }
  //监听录音自动停止接口
  onVoiceRecordEnd(){
    var that = this;
    wx.onVoiceRecordEnd({
    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
      complete: function (res) {
          var localId = res.localId; 
          that.id = localId;
          that.setState({status:2})
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
    this.setState({status:3})
  }
  //暂停播放接口
  pauseVoice(e){
    e.preventDefault();
    var id = this.id;
    wx.pauseVoice({
      localId: id // 需要暂停的音频的本地ID，由stopRecord接口获得
    });
    this.setState({status:4})
  }
  //停止播放接口,暂时没有用到，没有绑定到this上
  stopVoice(){
    wx.stopVoice({
      localId: '' // 需要停止的音频的本地ID，由stopRecord接口获得
    });
  }
  //监听语音播放完毕接口
  onVoicePlayEnd(){
    var that = this
    wx.onVoicePlayEnd({
      success: function (res) {
          var localId = res.localId; // 返回音频的本地ID
          that.setState({status:4})
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
      //等待后端传回的questionId
      // io.socket.post('/squareAnswer', {questId: this.props.squareQuestion.id, from: localStorage.getItem('userId'),answer:this.state.content}, (result, jwr) => {
      //       console.log(result)
      //       // io.socket.get('/squareQuest?questId='+this.props.squareQuestion.id+'&page=1', {}, (result, jwr) => {
      //       // setTimeout(function() {
      //       //   this.props.addCurrentSquare(result.question.answer)
      //       //   this.props.history.push('/squareQuestionDetail')
      //       // }.bind(this), 1000)
      //     // })
      //   })
      var timestamp = Date.now() + 'voice';
      io.socket.post('/voice',{id:serverId,name:timestamp},(result,jwr)=>{
          alert('voice接口访问成功')
        })
      }
    });
  }
  showArea(){
    switch(this.state.status){
      case 0:
        return (
          <div className="voiceArea">
            <img src="./img/startRecord.png" onTouchTap={this.startRecord}/>
            <div className="voice-title">点击开始录音，做多可录60S</div>
          </div>);
      case 1:
        return (
          <div className="voiceArea">
            <img src="./img/startRecord.png" onTouchTap={this.stopRecord}/>
            <div className="voice-title">再次点击结束录音，做多可录60S</div>
          </div>);
      case 2:
        return (
          <div className="voiceArea">
            <img src="./img/startVoice.png" onTouchTap={this.playVoice}/>
            <div className="voice-title">点击试听录音</div>
            <div className="voice-submit">
            <FlatButton backgroundColor="#0A964C"
                hoverColor="#999999" label="提交回答" labelStyle={labelStyle} style={btnStyle} onTouchTap={this.uploadVoice}/>
            </div>
          </div>);
      case 3:
        return(
          <div className="voiceArea">
            <img src="./img/voicePause.png" onTouchTap={this.pauseVoice}/>
            <div className="voice-title">点击暂停试听</div>
            <div className="voice-submit">
            <FlatButton backgroundColor="#0A964C"
                hoverColor="#999999" label="提交回答" labelStyle={labelStyle} style={btnStyle} onTouchTap={this.uploadVoice}/>
            </div>
          </div>)
      case 4:
        return(
          <div className="voiceArea">
            <img src="./img/startVoice.png" onTouchTap={this.playVoice}/>
            <div className="voice-title">继续试听</div>
            <div className="voice-submit">
            <FlatButton backgroundColor="#0A964C"
                hoverColor="#999999" label="提交回答" labelStyle={labelStyle} style={btnStyle} onTouchTap={this.uploadVoice}/>
            </div>
          </div>)
    }
    

  }

  render() {
    return (
      <div>
        {this.showArea()}
          
        {/*<div className="voiceArea">
                  <img src="./img/startRecord" onTouchTap={this.startRecord}/>
                  <span className="voice-title">点击开始录音，做多可录60S</span>
                </div>
                <button onTouchTap={this.startRecord}>开始录音</button>
                <button onTouchTap={this.stopRecord}>停止录音</button>
                <button onTouchTap={this.playVoice}>播放录音</button>
                <button onTouchTap={this.uploadVoice}>上传录音</button>*/}
      </div>
    )
  }
}