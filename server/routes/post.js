const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

// @route GET api/posts
// @desc Get all posts
// @access Public
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().sort({ _id: -1 }).populate('user', ['username']).populate('topic', ['title'])
		res.json({ success: true, posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/posts
// @desc Get posts by topic
// @access Public
router.get('/idTopic/:id', async (req, res) => {
	try {
		const posts = await Post.find({ topic: req.params.id }).sort({ _id: -1 }).populate('user', ['username']).populate('topic', ['title'])
		res.json({ success: true, posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/posts
// @desc Get post by id
// @access Public
router.get('/idPost/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate('user', ['username']).populate('topic', ['title'])
		res.json({ success: true, post })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/posts
// @desc Get posts by user
// @access Private
router.get('/myposts', verifyToken, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId }).populate('user', [
			'username'
		])
		res.json({ success: true, posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { content, topic } = req.body

	// Simple validation
	if (!content)
		return res
			.status(400)
			.json({ success: false, message: 'Content is required' })

	try {
		const newPost = new Post({
			content,
			topic,
			user: req.userId
		})

		await newPost.save()
		const post = await Post.findById(newPost._id).populate('user', ['username']).populate('topic', ['title'])
		res.json({ success: true, message: 'Post Success!', post: post })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { content, topic } = req.body

	// Simple validation
	if (!content)
		return res
			.status(400)
			.json({ success: false, message: 'Content is required' })

	try {
		let updatedPost = {
			content,
			topic
		}

		const postUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router