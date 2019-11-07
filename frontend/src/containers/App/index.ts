import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { signIn, signOut } from '../../actions/authentication'

import App from '../../components/App'

type State = {
  User: any,
}

const mapStateToProps = (state: State) => ({
  User: state.User,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => bindActionCreators({
  signIn,
  signOut,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
