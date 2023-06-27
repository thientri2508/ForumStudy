const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Comment = require('../models/Comment')

// @route GET api/comments
// @desc Get comments by post
// @access Public
router.get('/:id', async (req, res) => {
	try {
		const comments = await Comment.find({ post: req.params.id }).sort({ _id: -1 }).populate('user', ['username'])
		res.json({ success: true, comments })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/', async (req, res) => {
	try {
		const comments = await Comment.find({ }).select('post')
		res.json({ success: true, comments })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/comments
// @desc Create comment
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { content, post } = req.body

	// Simple validation
	if (!content)
		return res
			.status(400)
			.json({ success: false, message: 'Content is required' })

	try {
		const newComment = new Comment({
			content,
			user: req.userId,
            post
		})

		await newComment.save()

		res.json({ success: true, message: 'Comment Success!', comment: newComment })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/comment
// @desc Delete comment
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const commentDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedComment = await Comment.findOneAndDelete(commentDeleteCondition)

		// User not authorised or post not found
		if (!deletedComment)
			return res.status(401).json({
				success: false,
				message: 'Comment not found or user not authorised'
			})

		res.json({ success: true, comment: deletedComment })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router