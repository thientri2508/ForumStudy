import {
	ROOMS_LOADED_SUCCESS,
	ROOMS_LOADED_FAIL,
	ADD_ROOM,
	DELETE_ROOM,
	UPDATE_ROOM
} from '../contexts/constants'

export const roomReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case ROOMS_LOADED_SUCCESS:
			return {
				...state,
				rooms: payload,
				roomsLoading: false
			}

		case ROOMS_LOADED_FAIL:
			return {
				...state,
				rooms: [],
				roomsLoading: false
			}

		case ADD_ROOM:
			return {
				...state,
				rooms: [...state.rooms, payload]
			}

		case DELETE_ROOM:
			return {
				...state,
				rooms: state.rooms.filter(room => room._id !== payload)
			}

		case UPDATE_ROOM:
			const newRooms = state.rooms.map(room =>
				room._id === payload._id ? payload : room
			)

			return {
				...state,
				topics: newRooms
			}

		default:
			return state
	}
}