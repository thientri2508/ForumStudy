export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://sleepy-inlet-56101.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'web-forum'

export const TOPICS_LOADED_SUCCESS = 'TOPICS_LOADED_SUCCESS'
export const TOPICS_LOADED_FAIL = 'TOPICS_LOADED_FAIL'
export const ADD_TOPIC = 'ADD_TOPIC'
export const DELETE_TOPIC = 'DELETE_TOPIC'
export const UPDATE_TOPIC = 'UPDATE_TOPIC'
export const FIND_TOPIC = 'FIND_TOPIC'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
export const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS'
export const GET_POST_BY_ID_FAIL = 'GET_POST_BY_ID_FAIL'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'

export const COMMENTS_LOADED_SUCCESS = 'COMMENTS_LOADED_SUCCESS'
export const COMMENTS_LOADED_FAIL = 'COMMENTS_LOADED_FAIL'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const REPLIES_LOADED_FAIL = 'REPLIES_LOADED_FAIL'
export const REPLIES_LOADED_SUCCESS = 'REPLIES_LOADED_SUCCESS'
export const ADD_REPLY = 'ADD_REPLY'
export const DELETE_REPLY = 'DELETE_REPLY'

export const LIKES_LOADED_SUCCESS = 'LIKES_LOADED_SUCCESS'
export const LIKES_LOADED_FAIL = 'LIKES_LOADED_FAIL'
export const ADD_LIKE = 'ADD_LIKE'
export const DELETE_LIKE = 'DELETE_LIKE'