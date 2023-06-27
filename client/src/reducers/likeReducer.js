import {
	LIKES_LOADED_FAIL,
	LIKES_LOADED_SUCCESS,
	ADD_LIKE,
	DELETE_LIKE
} from '../contexts/constants'

export const likeReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LIKES_LOADED_SUCCESS:
			return {
				...state,
				likes: payload,
				likesLoading: false
			}

		case LIKES_LOADED_FAIL:
			return {
				...state,
				likes: [],
				likesLoading: false
			}

		case ADD_LIKE:
			return {
				...state,
				likes: [...state.likes, payload]
			}

		case DELETE_LIKE:
			return {
				...state,
				likes: state.likes.filter(like => like._id !== payload)
			}

		default:
			return state
	}
}