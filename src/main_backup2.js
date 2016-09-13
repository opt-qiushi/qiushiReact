import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {createStore} from 'redux'
import AppContainer from './containers/AppContainer'
import status from './store/visit_status'
import SlideBar from './components/SlideBar'
import {changeQiushi, changeGuanzhu, changeDongtai, changeWode} from './actions/homepage'
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


injectTapEventPlugin();

const store = createStore(status)





function render(){
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <SlideBar value={store.getState()}
           onQiushi={() => store.dispatch(changeQiushi())}
           onGuanzhu={() => store.dispatch(changeGuanzhu())}
           onDongtai={() => store.dispatch(changeDongtai())}
           onWode={() => store.dispatch(changeWode())} />
     </MuiThemeProvider>, 
      document.getElementById("root")
    )
}

render()
store.subscribe(render)
