import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import status from './store/visit_status'
import personDetail from './store/personDetail'
import questionDetail from './store/questionDetail'
import commentDetail from './store/commentDetail'
import SlideBar from './components/SlideBar'
import Category from './containers/category'
import {changeQiushi, changeGuanzhu, changeDongtai, changeWode} from './actions/homepage'
import injectTapEventPlugin from 'react-tap-event-plugin'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import Qiushi from './containers/qiushi'
import QiushiComp from './components/qiushiComp'
import galleryReducer from './store/galleryReducer'
import { connect } from 'react-redux'
import "./main.css"
import App from './containers/app'
import PersonDetail from './containers/personDetail'
import QuestionDetail from './containers/questionDetail'
import UserCenter from './containers/userCenter'
import userInfo from './store/userInfo'
import Dongtai from './containers/dongtai'
import dongtai from './store/dongtai'
import Guanzhu from './containers/guanzhu'
import guanzhu from './store/guanzhu'
import MyAnswer from './containers/myAnswer'
import MyQuestion from './containers/myQuestion'
import MyInformation from './containers/myInformation'
import MyFeedback from './containers/myFeedback'
import Collection from './containers/collection'
import myQuestions from './store/myQuestions'
import ApplyRule from './containers/applyRule'
import collection from './store/collection'
import MyFans from './containers/myFans'
import SquareAskQuestion from './components/squareAskQuestion'
import SquareQuestionDetail from './components/squareQuestionDetail'
import UploadImg from './components/bottomClass/uploadImg'
import io from './server'
import square from './store/square'
import Square from './components/square'
import SquareBinding from './containers/squareBinding'
import currentSquare from './store/currentSquare'
import SquareQuestionDetailBinding from './containers/squareQuestionBinding'
// import squareSelect from './store/squareSelect'


injectTapEventPlugin();

const reducer = combineReducers({
  status,
  galleryReducer,
  personDetail,
  questionDetail,
  commentDetail,
  userInfo,
  dongtai,
  guanzhu,
  myQuestions,
  collection,
  square,
  currentSquare,
  routing: routerReducer
})



const store = createStore(
  reducer
)


const history = syncHistoryWithStore(browserHistory, store)




const Wode = React.createClass({
  render() {
    return <h3>我的</h3>
  }
})
// io.socket.get('/config', {}, (result, jwr) => {    
//   console.log(result)          
//   sessionStorage.setItem("config",result);
// })
const routes = (
  <Route path="/" component={App}>
      <IndexRoute component={Qiushi} />
      <Route path="qiushi" component={Qiushi} />
      <Route path="guanzhu" component={Guanzhu} />
      <Route path="dongtai" component={Dongtai} />
      <Route path="wode" component={UserCenter} />
      <Route path="vipDetail" component={PersonDetail} />
      <Route path="questionDetail" component={QuestionDetail} />
      <Route path="category" component={Category} />
      <Route path="myAnswer" component={MyAnswer} />
      <Route path="myQuestion" component={MyQuestion} />
      <Route path="myInformation" component={MyInformation} />
      <Route path="myFeedback" component={MyFeedback} />
      <Route path="applyRule" component={ApplyRule}/>
      <Route path="collection" component={Collection} />
      <Route path="myFans" component={MyFans}/>
      <Route path="square" component={SquareBinding}/>
      <Route path="squareAskQuestion" component={SquareAskQuestion}/>
      <Route path="squareQuestionDetail" component={SquareQuestionDetailBinding}/>
      <Route path="upload" component={UploadImg}/>
  </Route>
);

// io.socket.get('/professional/openID', {openid:openId}, (result, jwr) => {
//             this.setState({userInfo: result[0],userId:result[0].id})

//             io.socket.get('/professional/getFollowing', {id: this.state.userId}, (foList, jwr) => {
//               io.socket.get('/professional/getNews', {id: this.state.userId}, (news, jwr) => {
//               this.setState({focusList: foList.following, dynamicList: news})
//              })
//             })
//             // document.cookie="userName="+result[0].name+";userImage="+result[0].avatar;
//           })

function render(){
  ReactDOM.render((
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Provider store={store}>
              <div>
                  <Router history={history}>
                    {routes}
                  </Router>
              </div>
          </Provider>
        </MuiThemeProvider>
      ), document.getElementById("root"))
}

render()
store.subscribe(render)