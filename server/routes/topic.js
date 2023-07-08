const express = require('express')
const router = express.Router()
const Topic = require('../models/Topic')
const verifyToken = require('../middleware/auth')

// @route GET api/topics
// @desc Get topics
// @access Public
router.get('/', async (req, res) => {
	try {
		const topics = await Topic.find().sort({ _id: -1 })
		res.json({ success: true, topics })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/topics
// @desc Create topic
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { title, description, image } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newTopic = new Topic({
			title,
			description,
			image,
			user: req.userId
		})

		await newTopic.save()

		res.json({ success: true, message: 'Created Success!', topic: newTopic })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/topics
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, image } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedTopic = {
			title,
			description: description || '',
			image
		}

		const topicUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedTopic = await Topic.findOneAndUpdate(
			topicUpdateCondition,
			updatedTopic,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedTopic)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			topic: updatedTopic
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/topics
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const topicDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedTopic = await Topic.findOneAndDelete(topicDeleteCondition)

		// User not authorised or post not found
		if (!deletedTopic)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedTopic })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router