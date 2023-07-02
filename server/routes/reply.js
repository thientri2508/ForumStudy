const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Reply = require('../models/Reply')

// @route GET api/replies
// @desc Get replies by post
// @access Public
router.get('/:id', async (req, res) => {
	try {
		const replies = await Reply.find({ post: req.params.id }).sort({ _id: -1 }).populate('user', ['fullname'])
		res.json({ success: true, replies })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/replies
// @desc Create replies
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { content, post, comment } = req.body

	// Simple validation
	if (!content)
		return res
			.status(400)
			.json({ success: false, message: 'Content is required' })

	try {
		const newReply = new Reply({
			content,
			user: req.userId,
			post,
            comment
		})

		await newReply.save()

		res.json({ success: true, message: 'Comment Success!', reply: newReply })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/reply
// @desc Delete reply
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const replyDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedReply = await Reply.findOneAndDelete(replyDeleteCondition)

		// User not authorised or post not found
		if (!deletedReply)
			return res.status(401).json({
				success: false,
				message: 'Comment not found or user not authorised'
			})

		res.json({ success: true, reply: deletedReply })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router