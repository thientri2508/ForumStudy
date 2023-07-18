const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Notification = require('../models/Notification')

router.get('/:id', async (req, res) => {
	try {
		const notifications = await Notification.find({ receiver: req.params.id }).sort({ _id: -1 }).limit(9).populate('sender', ['fullname', 'avatar'])
		res.json({ success: true, notifications })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/amount/:id', async (req, res) => {
	try {
		const notifications = await Notification.countDocuments({ receiver: req.params.id, status: 'not seen' })
		res.json({ success: true, notifications })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/', verifyToken, async (req, res) => {

	try {
		let updatedNotification = {
			status: 'seen'
		}

		const notificationUpdateCondition = { receiver: req.userId, status: 'not seen' }

		updatedNotification = await Notification.updateMany(
			notificationUpdateCondition,
			updatedNotification
		)

		res.json({
			success: true,
			message: 'Excellent progress!',
			notification: updatedNotification
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.post('/', verifyToken, async (req, res) => {
	const { receiver, post, message, date, status } = req.body

	try {
		const newNotification = new Notification({
			receiver,
			sender: req.userId,
            post,
			message,
			date,
			status
		})

		await newNotification.save()

		res.json({ success: true, message: 'Notification Success!', notification: newNotification })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router