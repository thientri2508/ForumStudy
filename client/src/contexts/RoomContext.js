import { createContext, useReducer } from 'react'
import { roomReducer } from '../reducers/roomReducer'
import {
	apiUrl,
	ROOMS_LOADED_SUCCESS,
	ROOMS_LOADED_FAIL,
	ADD_ROOM,
	DELETE_ROOM,
	UPDATE_ROOM
} from './constants'
import axios from 'axios'

export const RoomContext = createContext()

const RoomContextProvider = ({ children }) => {
	// State
	const [roomState, dispatch] = useReducer(roomReducer, {
		room: null,
		rooms: [],
		roomsLoading: true
	})

	// Get all rooms
	const getRooms = async () => {
		try {
			const response = await axios.get(`${apiUrl}/rooms`)
			if (response.data.success) {
				dispatch({ type: ROOMS_LOADED_SUCCESS, payload: response.data.rooms })
			}
		} catch (error) {
			dispatch({ type: ROOMS_LOADED_FAIL })
		}
	}

	// Add room
	const addRoom = async newRoom => {
		try {
			const response = await axios.post(`${apiUrl}/rooms`, newRoom)
			if (response.data.success) {
				dispatch({ type: ADD_ROOM, payload: response.data.room })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete room
	const deleteRoom = async roomId => {
		try {
			const response = await axios.delete(`${apiUrl}/rooms/${roomId}`)
			if (response.data.success)
				dispatch({ type: DELETE_ROOM, payload: roomId })
		} catch (error) {
			console.log(error)
		}
	}

	// Update room
	const updateRoom = async updatedRoom => {
		try {
			const response = await axios.put(
				`${apiUrl}/rooms/${updatedRoom._id}`,
				updatedRoom
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_ROOM, payload: response.data.room })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Room context data
	const roomContextData = {
		roomState,
		getRooms,
		addRoom,
		deleteRoom,
		updateRoom
	}

	return (
		<RoomContext.Provider value={roomContextData}>
			{children}
		</RoomContext.Provider>
	)
}

export default RoomContextProvider