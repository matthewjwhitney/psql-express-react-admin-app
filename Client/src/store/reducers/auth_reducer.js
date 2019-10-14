// Handles Authentication state
import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  isAuthenticated: false,
}

const Auth_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return  {
        ...state,
        isAuthenticated: true
      }
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
    }
}

export default Auth_Reducer;
