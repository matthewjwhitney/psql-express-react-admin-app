import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  all_users: []
}

const Users_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_USERS:
      return {
        ...state,
        all_users: action.payload
      }
    case ACTION_TYPES.REMOVE_ALL_USERS:
      return {
        ...state,
        all_users: []
      }
    default:
      return state
    }
}

export default Users_Reducer;
