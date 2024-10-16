import { createContext, useReducer, useState, useEffect } from 'react'
import { postReducer } from '../reducers/postReducer'
import {
	apiUrl,
	POSTS_LOADED_FAIL,
	POSTS_LOADED_SUCCESS,
	POSTS_PAGE_LOADED_SUCCESS,
	POSTS_PAGE_LOADED_FAIL,
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
	FIND_POST,
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAIL
} from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	// State
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		btnSeeMore: true,
		postsLoading: true
	})

	const [showAddPostModal, setShowAddPostModal] = useState(false)
	// const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	// const [showToast, setShowToast] = useState({
	// 	show: false,
	// 	message: '',
	// 	type: null
	// })

	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL }) 
		}
	}

	// Get posts by page
	const getPostsByPage = async (page) => {
		try {
			const response = await axios.get(`${apiUrl}/posts/page/${page}`)
			if (response.data.success && response.data.posts.length) {
				dispatch({ type: POSTS_PAGE_LOADED_SUCCESS, payload: response.data.posts })
			} else {
				dispatch({ type: POSTS_PAGE_LOADED_FAIL })
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Get posts by topic
	const getPostsByTopic = async topicId => {
		try {
			const response = await axios.get(`${apiUrl}/posts/idTopic/${topicId}`)
			if (response.data.success) {
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL })
		}
	}

	// Get posts by user
	const getPostsByUser = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts/myposts`)
			if (response.data.success) {
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL })
		}
	}

    // Start: Get all posts
    // useEffect(() => getPosts(), [])

    // Get post by id
    const getPostById = async postId => {
		try {
			const response = await axios.get(`${apiUrl}/posts/idPost/${postId}`)
			if (response.data.success) {
				dispatch({ type: GET_POST_BY_ID_SUCCESS, payload: response.data.post }) 
			}
		} catch (error) {
			dispatch({ type: GET_POST_BY_ID_FAIL })
		}
	}

	// Add post
	const addPost = async newPost => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, newPost)
			if (response.data.success) {
				dispatch({ type: ADD_POST, payload: response.data.post })
				return response.data.post
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete post
	const deletePost = async postId => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success)
				dispatch({ type: DELETE_POST, payload: postId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find post when user is updating post
	const findPost = postId => {
		const post = postState.posts.find(post => post._id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}

	// Update post
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${updatedPost._id}`,
				updatedPost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Post context data
	const postContextData = {
		postState,
		getPosts,
		getPostsByPage,
		getPostsByUser,
		showAddPostModal,
		setShowAddPostModal,
		// showUpdatePostModal,
		// setShowUpdatePostModal,
		addPost,
		// showToast,
		// setShowToast,
		deletePost,
		findPost,
        getPostById,
		getPostsByTopic,
		updatePost
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider