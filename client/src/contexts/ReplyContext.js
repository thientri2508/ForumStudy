import { createContext, useReducer} from 'react'
import { replyReducer } from '../reducers/replyReducer'
import {
	apiUrl,
	REPLIES_LOADED_FAIL,
	REPLIES_LOADED_SUCCESS,
	ADD_REPLY,
	DELETE_REPLY
} from './constants'
import axios from 'axios'

export const ReplyContext = createContext()

const ReplyContextProvider = ({ children }) => {
	// State
	const [replyState, dispatch] = useReducer(replyReducer, {
		replies: [],
		repliesLoading: true
	})

	// Get All replies
	const getAllReplies = async () => {
		try {
			const response = await axios.get(`${apiUrl}/replies`)
			if (response.data.success) {
				dispatch({ type: REPLIES_LOADED_SUCCESS, payload: response.data.replies })
			}
		} catch (error) {
			dispatch({ type: REPLIES_LOADED_FAIL })
		}
	}
	
	// Get replies by idPost
	const getReplies = async postId => {
		try {
			const response = await axios.get(`${apiUrl}/replies/${postId}`)
			if (response.data.success) {
				dispatch({ type: REPLIES_LOADED_SUCCESS, payload: response.data.replies })
				return response.data.replies
			}
		} catch (error) {
			dispatch({ type: REPLIES_LOADED_FAIL })
		}
	}

	// Add reply
	const addReply = async newReply => {
		try {
			const response = await axios.post(`${apiUrl}/replies`, newReply)
			if (response.data.success) {
				//dispatch({ type: ADD_REPLY, payload: response.data.reply })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete reply
	const deleteReply = async replyId => {
		try {
			const response = await axios.delete(`${apiUrl}/replies/${replyId}`)
			 //if (response.data.success)
			 	//dispatch({ type: DELETE_REPLY, payload: replyId })
		} catch (error) {
			console.log(error)
		}
	}

	// Commemt context data
	const replyContextData = {
		replyState,
		getAllReplies,
		getReplies,
		addReply,
		deleteReply
	}

	return (
		<ReplyContext.Provider value={replyContextData}>
			{children}
		</ReplyContext.Provider>
	)
}

export default ReplyContextProvider