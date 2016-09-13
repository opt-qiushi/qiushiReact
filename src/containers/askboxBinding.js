import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Askbox from '../components/bottomClass/askbox'
import * as actions  from '../actions/homepage'

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    content: state.personDetail.question,
    totalPages: state.personDetail.total_pages,
    userId: state.userInfo.id,
    guestId: state.personDetail.detail.id,
    ableToSee: state.personDetail.ableToSee
  }
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Askbox)