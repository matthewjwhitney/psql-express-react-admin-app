import * as ACTION_TYPES from './action_types';

/*eslint-disable */


// Simple Middleware redux thunk async actions


//Async actions to handle authentication state
export function login_success() {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

export function login_failure() {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}




//Get posts from the db based on user id
export function get_db_posts(posts) {
  return {
    type: ACTION_TYPES.FETCH_DB_POSTS_SUCCESS,
    payload: posts
  }
}

export function remove_db_posts() {
  return {
    type: ACTION_TYPES.REMOVE_DB_POSTS
  }
}

//Get all users from db
export function get_all_users(users) {
  return {
    type: ACTION_TYPES.GET_ALL_USERS,
    payload: users
  }
}

export function remove_all_users() {
  return {
      type: ACTION_TYPES.REMOVE_ALL_USERS
  }
}


//Get comments for one post
export function get_db_post_comments(comments) {
  return {
    type: ACTION_TYPES.FETCH_DB_POST_COMMENTS_SUCCESS,
    payload: comments
  }
}

export function remove_db_post_comments() {
  return {
    type: ACTION_TYPES.DB_POST_COMMENTS_FAILURE
  }
}


//Get appointments
export function get_db_appointments(appointments) {
  return {
    type: ACTION_TYPES.APPOINTMENTS_SUCCESS,
    payload: appointments
  }
}


//Results for db posts search query
export function get_search_posts(posts) {
  return {
    type: ACTION_TYPES.SEARCH_POSTS_SUCCESS,
    payload: posts
  }
}

export function remove_search_posts() {
  return {
      type: ACTION_TYPES.SEARCH_POSTS_FAILURE
  }
}
