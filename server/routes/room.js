const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Room = require('../models/Room')

router.get('/', async (req, res) => {
	try {
		const rooms = await Room.find({ }).sort({ _id: -1 }).populate('user', [
			'fullname', 'avatar'
		])
		res.json({ success: true, rooms })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/rooms
// @desc Create room
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { name, date, time } = req.body

	// Simple validation
	if (!name)
		return res
			.status(400)
			.json({ success: false, message: 'Name of room is required' })

	try {
		const newRoom = new Room({
			name,
            date,
            time,
			user: req.userId
		})

		await newRoom.save()

		res.json({ success: true, message: 'Room Success!', room: newRoom })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/comment
// @desc Delete comment
// @access Private
// router.delete('/:id', verifyToken, async (req, res) => {
// 	try {
// 		const commentDeleteCondition = { _id: req.params.id, user: req.userId }
// 		const deletedComment = await Comment.findOneAndDelete(commentDeleteCondition)

// 		// User not authorised or post not found
// 		if (!deletedComment)
// 			return res.status(401).json({
// 				success: false,
// 				message: 'Comment not found or user not authorised'
// 			})

// 		res.json({ success: true, comment: deletedComment })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

module.exports = router