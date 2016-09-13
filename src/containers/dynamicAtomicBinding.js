import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionAtomic from '../components/bottomClass/questionAtomic'
import * as actions  from '../actions/homepage'

function mapStateToProps(state) {
  return {
    state: state,
    shenglue: true
  }
}

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(QuestionAtomic)