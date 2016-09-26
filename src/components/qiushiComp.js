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
    this.props.changeQiushi()
    this.props.shouye()
    window.scrollTo(0,0)
     io.socket.get('/professional/getHomeUsers', {}, (result, jwr) => {
         this.props.galleryUpdate(result)
     })
     window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render(){
    return (
        <div className="contentBox">
              <PicSlider history={this.props.history} />
             <div className="eightClasses">
                <div className="fourClasses">
                  <ClassComp categoryName="学术" categoryUrl="img/class/xueshu.png" history={this.props.history} />
                  <ClassComp categoryName="社团" categoryUrl="img/class/shetuan.png" history={this.props.history} />
                  <ClassComp categoryName="创业" categoryUrl="img/class/chuangtou.png" history={this.props.history} />
                  <ClassComp categoryName="电脑" categoryUrl="img/class/diannao.png" history={this.props.history} />
                </div>
                <div className="fourClasses">
                  <ClassComp categoryName="美妆" categoryUrl="img/class/meizhuang.png" history={this.props.history} />
                  <ClassComp categoryName="摄影" categoryUrl="img/class/sheying.png" history={this.props.history} />
                  <ClassComp categoryName="美食" categoryUrl="img/class/meishi.png" history={this.props.history} />
                  <ClassComp categoryName="其他" categoryUrl="img/class/qita.png" history={this.props.history} />
                </div>
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
