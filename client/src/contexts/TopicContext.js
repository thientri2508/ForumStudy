import { createContext, useReducer, useState, useEffect } from 'react'
import { topicReducer } from '../reducers/topicReducer'
import {
	apiUrl,
	TOPICS_LOADED_SUCCESS,
	TOPICS_LOADED_FAIL,
	ADD_TOPIC,
	DELETE_TOPIC,
	UPDATE_TOPIC,
	FIND_TOPIC
} from './constants'
import axios from 'axios'

export const TopicContext = createContext() 

const TopicContextProvider = ({ children }) => {
	// State
	const [topicState, dispatch] = useReducer(topicReducer, {
		topic: null,
		topics: [],
		topicsLoading: true
	})

	const [showAddTopic, setShowAddTopic] = useState(false)

	// Get all topics
	const getTopics = async () => {
		try {
			const response = await axios.get(`${apiUrl}/topics`)
			if (response.data.success) {
				dispatch({ type: TOPICS_LOADED_SUCCESS, payload: response.data.topics })
			}
		} catch (error) {
			dispatch({ type: TOPICS_LOADED_FAIL })
		}
	}

    // Start: Get all topics
    // useEffect(() => getTopics(), [])

	// Add topic
	const addTopic = async newTopic => {
		try {
			const response = await axios.post(`${apiUrl}/topics`, newTopic)
			if (response.data.success) {
				dispatch({ type: ADD_TOPIC, payload: response.data.topic })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete topic
	const deleteTopic = async topicId => {
		try {
			const response = await axios.delete(`${apiUrl}/topics/${topicId}`)
			if (response.data.success)
				dispatch({ type: DELETE_TOPIC, payload: topicId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find topic when user is updating topic
	const findTopic = topicId => {
		const topic = topicState.topics.find(topic => topic._id === topicId)
		dispatch({ type: FIND_TOPIC, payload: topic })
	}

	// Update topic
	const updateTopic = async updatedTopic => {
		try {
			const response = await axios.put(
				`${apiUrl}/topics/${updatedTopic._id}`,
				updatedTopic
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_TOPIC, payload: response.data.topic })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Post context data
	const topicContextData = {
		topicState,
		showAddTopic,
		setShowAddTopic,
		getTopics,
		addTopic,
		deleteTopic,
		findTopic,
		updateTopic
	}

	return (
		<TopicContext.Provider value={topicContextData}>
			{children}
		</TopicContext.Provider>
	)
}

export default TopicContextProvider