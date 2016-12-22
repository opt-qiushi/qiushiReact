import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import cookie from 'react-cookie'
import io from '../../server'
import './payTest.css'

export default class PayTest extends Component{
 constructor(props) {
    super(props);
    this.state = {fee:1}
    this.handleChangeFee = this.handleChangeFee.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }
  handleChangeFee(event){
    this.setState({fee: event.target.value})
  }
  handleSend(){
    var userId = localStorage.getItem('userId')
    var total_fee = this.state.fee
    io.socket.post('/wechat_pay/',{userId:userId,total_fee:total_fee},(result,jwr)=>{
      // console.log("result:",result)
      // var r = result.payargs
      // wx.chooseWXPay({
      //     timestamp: r.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //     nonceStr: r.nonceStr, // 支付签名随机串，不长于 32 位
      //     package: r.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      //     signType: r.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //     paySign: r.paySign, // 支付签名
      //     success: function (res) {
      //       // 支付成功后的回调函数
      //       alert('success')
      //       if(res.errMsg == "chooseWXPay:ok" ) {
      //         //支付成功
      //         alert('chooseWXPay:ok')
      //         }else{
      //             alert(res.errMsg);
      //         }
      //     }
      // });
      function onBridgeReady(){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
            // {
            //    "appId" ： "wx2421b1c4370ec43b",     //公众号名称，由商户传入     
            //    "timeStamp"：" 1395712654",         //时间戳，自1970年以来的秒数     
            //    "nonceStr" ： "e61463f8efa94090b1f366cccfbbb444", //随机串     
            //    "package" ： "prepay_id=u802345jgfjsdfgsdg888",     
            //    "signType" ： "MD5",         //微信签名方式：     
            //    "paySign" ： "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
            // }
          result.payargs,
          function(res){     
            alert(res.err_msg)
            if(res.err_msg == "get_brand_wcpay_request：ok" ) {
              alert("OK")
           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          }
       ); 
      }
      if (typeof WeixinJSBridge == "undefined"){
         if( document.addEventListener ){
             document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
         }else if (document.attachEvent){
             document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
         }
      }else{
         onBridgeReady();
      }
    })
  }
  // componentWillMount(){
  //   io.socket.get("/config",{targetUrl:localStorage.getItem('fromUrl')},(result, jwr) =>{
  //     // result.debug = true;
  //     wx.config(result)
  //     wx.ready(function(){

  //     });
  //     wx.error(function(){
  //       var url = location.href.split('#')[0];
  //       localStorage.setItem('fromUrl',url)


  //       io.socket.get("/config",{targetUrl:localStorage.getItem('fromUrl')},(result, jwr) =>{
  //         // result.debug = true;
  //         wx.config(result)
  //         wx.ready(function(){

  //         });
  //         wx.error(function(){
  //           console.log('enter error two')
  //         });  
  //       });
  //     });  
  //   });      
  // }
  componentDidMount(){
    
  }
  render() {

    return (
      <div className="pay-test">
        <TextField
          floatingLabelText="请输入金额（分）"
          fullWidth={true}
          value={this.state.fee}
          onChange={this.handleChangeFee}
        />
        <FlatButton
          label="提交"
          primary={true}
          onTouchTap={this.handleSend}
        />
      </div>
    )
  }
}