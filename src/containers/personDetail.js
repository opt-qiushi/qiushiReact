import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PersonDetailComp from '../components/personDetailComp'
import * as actions  from '../actions/homepage'


//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    person: state.personDetail,
    userId: state.userInfo.id,
    guestId: state.status.guestId
  }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(PersonDetailComp)