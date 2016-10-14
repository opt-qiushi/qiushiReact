import React, { Component } from 'react'
import "./qiushiComp.css"
import Gallery from "../containers/gallery.js"
import GalleryComp from '../components/galleryComp.js'
import ClassComp from '../containers/classComp'
import Snackbar from 'material-ui/Snackbar'
import PicSlider from '../containers/picSlider'
import CircularProgress from 'material-ui/CircularProgress'
import io from '../server'

const circularStyle={
  textAlign: "center"
}

export default class QiushiComp extends Component{
  constructor(props){
    super(props)
    this.state={
      isInfiniteLoading: false,
      open: false,
      isLoading: false
    }
    // console.log(this.props)
    this.handleScrollToBottom=this.handleScrollToBottom.bind(this)
    this.elementInfiniteLoad=this.elementInfiniteLoad.bind(this)
    this.handleRequestOpen=this.handleRequestOpen.bind(this)
    this.handleRequestClose=this.handleRequestClose.bind(this)
    this.showLoading=this.showLoading.bind(this)
    this.handleScroll=this.handleScroll.bind(this)
  }

  showLoading(){
    if(this.state.isInfiniteLoading) return this.elementInfiniteLoad()
      else return 
  }

  handleScroll(){
    var scrollviewOffsetY = document.body.scrollTop
    var scrollviewFrameHeight = document.body.clientHeight
    var scrollviewContentHeight = document.body.scrollHeight

    var sum = scrollviewOffsetY+scrollviewFrameHeight
    if(sum == scrollviewContentHeight && !this.state.isLoading){
      return this.handleScrollToBottom()
    }
    return 
  }

  handleRequestOpen(){
    this.setState({
      open: true
    })
  }

  handleRequestClose(){
    this.setState({
      open: false
    })
  }

  handleScrollToBottom(){
        this.setState({
            isInfiniteLoading: true,
            isLoading: true
        })
        if(this.props.pages > this.props.totalPages){
          this.setState({isInfiniteLoading: false, isLoading: false})
          return 
        }
        io.socket.get('/professional/getHomeUsers', {page: this.props.pages+1}, (result, jwr) => {
          setTimeout(function() {
            this.props.galleryLoadingMore(result.professionals)
            this.setState({isInfiniteLoading: false, isLoading: false})
          }.bind(this), 2000)
        })
  }

  elementInfiniteLoad(){
      return <div style={circularStyle}><CircularProgress size={0.5} /></div>
    }

  galleryList(){
    var rows=[]
    this.props.person.forEach(function(personAtom,i){
      rows.push(<Gallery key={i} theOne={personAtom} />)
    })

    return <div>{rows}</div>
  }

  componentDidMount(){
    //当首页url带参数时跳转到指定页面
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        if(theRequest.fromUrl === "vipDetail"){
          this.props.saveGuestId(theRequest.id);
          this.props.history.push("/vipDetail?id="+theRequest.id);
        }else if(theRequest.fromUrl === "questionDetail"){
          this.props.saveQuestionId(theRequest.id);
          this.props.history.push("/questionDetail?id="+theRequest.id);
        }

    }
    this.props.changeQiushi()
    this.props.shouye()
    window.scrollTo(0,0)
    io.socket.get('/professional/getHomeUsers', {id:localStorage.getItem('userId')}, (result, jwr) => {
        this.props.galleryUpdate(result)
    })
     window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render(){
    // io.socket.get('/professional/getHomeUsers', {id:this.props.userInfo.id}, (result, jwr) => {
    //     this.props.galleryUpdate(result)
    // })
    return (
        <div className="contentBox">
              <PicSlider history={this.props.history} />
             <div className="fourClasses">
                <ClassComp categoryName="学术" history={this.props.history} />
                <ClassComp categoryName="创业" history={this.props.history} />
                <ClassComp categoryName="美食" history={this.props.history} />
                <ClassComp categoryName="其他" history={this.props.history} />
             </div>
             <div className="recommend">
                <p>人气推荐</p>
             </div>
             <Snackbar
                open={this.state.open}
                message="没有更多内容了"
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose} />
            
             {this.galleryList()}
             {this.showLoading()}
        </div>
      )
  }
}
