import {
	REPLIES_LOADED_FAIL,
	REPLIES_LOADED_SUCCESS,
	ADD_REPLY,
	DELETE_REPLY
} from '../contexts/constants'

export const replyReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case REPLIES_LOADED_SUCCESS:
			return {
				...state,
				replies: payload,
				repliesLoading: false
			}

		case REPLIES_LOADED_FAIL:
			return {
				...state,
				replies: [],
				repliesLoading: false
			}

		case ADD_REPLY:
			return {
				...state,
				replies: [payload, ...state.replies]
			}

		case DELETE_REPLY:
			return {
				...state,
				replies: state.replies.filter(reply => reply._id !== payload)
			}

		default:
			return state
	}
}