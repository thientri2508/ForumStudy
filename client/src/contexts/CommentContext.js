import { createContext, useReducer} from 'react'
import { commentReducer } from '../reducers/commentReducer'
import {
	apiUrl,
	COMMENTS_LOADED_FAIL,
	COMMENTS_LOADED_SUCCESS,
	ADD_COMMENT,
	DELETE_COMMENT
} from './constants'
import axios from 'axios'

export const CommentContext = createContext()

const CommentContextProvider = ({ children }) => {
	// State
	const [commentState, dispatch] = useReducer(commentReducer, {
		comments: [],
		commentsLoading: true
	})

	// Get All comments
	const getAllComments = async () => {
		try {
			const response = await axios.get(`${apiUrl}/comments`)
			if (response.data.success) {
				dispatch({ type: COMMENTS_LOADED_SUCCESS, payload: response.data.comments })
			}
		} catch (error) {
			dispatch({ type: COMMENTS_LOADED_FAIL })
		}
	}
	
	// Get comments by idPost
	const getComments = async postId => {
		try {
			const response = await axios.get(`${apiUrl}/comments/${postId}`)
			if (response.data.success) {
				dispatch({ type: COMMENTS_LOADED_SUCCESS, payload: response.data.comments })
			}
		} catch (error) {
			dispatch({ type: COMMENTS_LOADED_FAIL })
		}
	}

	// Add comment
	const addComment = async newComment => {
		try {
			const response = await axios.post(`${apiUrl}/comments`, newComment)
			if (response.data.success) {
				//dispatch({ type: ADD_COMMENT, payload: response.data.comment })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete comment
	const deleteComment = async commentId => {
		try {
			const response = await axios.delete(`${apiUrl}/comments/${commentId}`)
			// if (response.data.success)
			// 	dispatch({ type: DELETE_COMMENT, payload: commentId })
		} catch (error) {
			console.log(error)
		}
	}

	// Commemt context data
	const commentContextData = {
		commentState,
		getAllComments,
		getComments,
		addComment,
		deleteComment
	}

	return (
		<CommentContext.Provider value={commentContextData}>
			{children}
		</CommentContext.Provider>
	)
}

export default CommentContextProvider