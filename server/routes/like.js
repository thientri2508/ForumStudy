const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Like = require('../models/Like')

// @route GET api/likes
// @desc Get likes by post
// @access Public
router.get('/:id', async (req, res) => {
	try {
		const likes = await Like.find({ post: req.params.id })
		res.json({ success: true, likes })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/', async (req, res) => {
	try {
		const likes = await Like.find({ }).select('post')
		res.json({ success: true, likes })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/like
// @desc Create Like
// @access Private
router.post('/:id', verifyToken, async (req, res) => {
    try {
		const newLike = new Like({
			user: req.userId,
            post: req.params.id
		})

        await newLike.save()
		
        res.json({ success: true, message: 'Comment Success!', like: newLike })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/like
// @desc Delete like
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const likeDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedLike = await Like.findOneAndDelete(likeDeleteCondition)

		// User not authorised or post not found
		if (!deletedLike)
			return res.status(401).json({
				success: false,
				message: 'Comment not found or user not authorised'
			})

		res.json({ success: true, like: deletedLike })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router