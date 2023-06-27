import {
	TOPICS_LOADED_SUCCESS,
	TOPICS_LOADED_FAIL,
	ADD_TOPIC,
	DELETE_TOPIC,
	UPDATE_TOPIC,
	FIND_TOPIC
} from '../contexts/constants'

export const topicReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case TOPICS_LOADED_SUCCESS:
			return {
				...state,
				topics: payload,
				topicsLoading: false
			}

		case TOPICS_LOADED_FAIL:
			return {
				...state,
				topics: [],
				topicsLoading: false
			}

		case ADD_TOPIC:
			return {
				...state,
				topics: [...state.topics, payload]
			}

		case DELETE_TOPIC:
			return {
				...state,
				topics: state.topics.filter(topic => topic._id !== payload)
			}

		case FIND_TOPIC:
			return { ...state, topic: payload }

		case UPDATE_TOPIC:
			const newTopics = state.topics.map(topic =>
				topic._id === payload._id ? payload : topic
			)

			return {
				...state,
				topics: newTopics
			}

		default:
			return state
	}
}