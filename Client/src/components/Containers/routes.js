import React, { Component } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux';

import '../../App.css';

import * as ACTION_TYPES from '../../store/actions/action_types'; // eslint-disable-line
import * as ASYNC_ACTIONS from '../../store/actions/actions';

import history from '../../utils/history';
import Auth from '../../utils/auth';
import AuthCheck from '../../utils/authcheck';


import Profile from './profile';
import Header from './header';
import Users from './users';

import Posts from '../Blog/posts';
import ShowPost from '../Blog/showpost';
import AddPost from '../Blog/addpost';
import EditPost from '../Blog/editpost';


import Home from '../Functional/home';
import Callback from '../Functional/callback';




export const auth = new Auth();

//Function for automatically handling authentication
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

//Higher Order Component for route protection. Requires authentication to render component.
const PrivateRoute = ({ component: Component, auth, authed, ...rest }) => (
  <Route {...rest}
   render={props => authed === true
     ? <Component auth={auth} {...props} />
     : <Redirect to={{pathname: "/"}} />
    }
  />
);



class Routes extends Component {
  componentDidMount() {
    if(auth.isAuthenticated()) {
      this.props.login_success()
    } else if (!auth.isAuthenticated()) {
      this.props.login_failure()
      }
    }

    render() {
      return(

      <Router history={history}>
        <div>
          <Header auth={auth} authed={this.props.isAuthenticated}/>
          <div className="FlexRowMain">
                <Switch>
                  {/* Public unprotected routes*/ }
                  <Route exact path='/'  render={(props) => <Home auth={auth} {...props} />} />


                  {/* Alternate method for rendering */}
                  <PrivateRoute path="/posts" auth={auth} authed={auth.isAuthenticated()} component={ Posts } />
                  <PrivateRoute path="/post/:id" auth={auth} authed={auth.isAuthenticated()} component={ ShowPost } />
                  <PrivateRoute path='/editpost/:id' auth={auth} authed={auth.isAuthenticated()} component={EditPost} />
                  <PrivateRoute path="/newpost" auth={auth} authed={auth.isAuthenticated()} component={ AddPost } />
                  <PrivateRoute path="/users" auth={auth} authed={auth.isAuthenticated()}component={ Users } />


                  {/* Route for automatically handling authentication and callback */}
                  <Route path="/callback" render={(props) => {handleAuthentication(props); return <Callback {...props} /> }}/>
                  <Route path="/authcheck" render={(props) => <AuthCheck auth={auth} {...props} />} />

                  {/* Pattern for non-public routes. Use in exact same way for more components requiring isAuthenticated */}
                  <PrivateRoute path="/profile"  auth={auth} authed={auth.isAuthenticated()} component={Profile} />
                </Switch>
            </div>
        </div>
      </Router>
   )}
}


function mapStateToProps(state) {
  return {
      isAuthenticated: state.auth_reducer.isAuthenticated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ASYNC_ACTIONS.login_success()),
    login_failure:  () => dispatch(ASYNC_ACTIONS.login_failure())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
