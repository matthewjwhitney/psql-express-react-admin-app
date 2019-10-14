import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as ASYNC_ACTIONS from '../store/actions/actions';
import history from './history';




class AuthCheck extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated()) {
      this.props.login_success()
      history.replace('/')
    } else {
      this.props.login_failure()
      history.replace('/')
    }
  }

   render() {
    return (
        <div>
       </div>
    )
  }
}



function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ASYNC_ACTIONS.login_success()),
    login_failure: () => dispatch(ASYNC_ACTIONS.login_failure())
  }
}


export default connect(null, mapDispatchToProps)(AuthCheck);
