import { createContext, useReducer} from 'react'
import { likeReducer } from '../reducers/likeReducer'
import {
	apiUrl,
	LIKES_LOADED_FAIL,
	LIKES_LOADED_SUCCESS,
	ADD_LIKE,
	DELETE_LIKE
} from './constants'
import axios from 'axios'

export const LikeContext = createContext()

const LikeContextProvider = ({ children }) => {
	// State
	const [likeState, dispatch] = useReducer(likeReducer, {
		likes: [],
		likesLoading: true
	})

	// Get likes by postId
	const getLikes = async postId => {
		try {
			const response = await axios.get(`${apiUrl}/likes/${postId}`)
			if (response.data.success) {
				dispatch({ type: LIKES_LOADED_SUCCESS, payload: response.data.likes })
			}
		} catch (error) {
			dispatch({ type: LIKES_LOADED_FAIL })
		}
	}

	//Get All likes
	const getAllLikes = async () => {
		try {
			const response = await axios.get(`${apiUrl}/likes`)
			if (response.data.success) {
				dispatch({ type: LIKES_LOADED_SUCCESS, payload: response.data.likes })
			}
		} catch (error) {
			dispatch({ type: LIKES_LOADED_FAIL })
		}
	}

	// Add like
	const addLike = async postID => {
		try {
			const response = await axios.post(`${apiUrl}/likes/${postID}`)
			if (response.data.success) {
				dispatch({ type: ADD_LIKE, payload: response.data.like })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete like
	const deleteLike = async likeId => {
		try {
			const response = await axios.delete(`${apiUrl}/likes/${likeId}`)
			if (response.data.success)
				dispatch({ type: DELETE_LIKE, payload: likeId })
		} catch (error) {
			console.log(error)
		}
	}

	// Commemt context data
	const likeContextData = {
		likeState,
		getAllLikes,
		getLikes,
		addLike,
		deleteLike
	}

	return (
		<LikeContext.Provider value={likeContextData}>
			{children}
		</LikeContext.Provider>
	)
}

export default LikeContextProvider