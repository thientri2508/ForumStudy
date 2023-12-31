const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId)
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
	const { username, password, fullname, avatar, role, signinWith } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const setFullName = fullname !== '' ? fullname : 'Anonymous'
		const newUser = new User({ username, password: hashedPassword, fullname: setFullName, avatar, role, signinWith })
		await newUser.save()

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/login/google
// @desc Register user with google account
// @access Public
router.post('/login/google', async (req, res) => {
	const { username, password, fullname, avatar, role, signinWith } = req.body

	// Simple validation
	if (!username)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user) {
			const accessToken = jwt.sign(
				{ userId: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)
	
			return res.json({
					success: true,
					message: 'User logged in successfully',
					accessToken
					})
		} else{
			const hashedPassword = await argon2.hash(password)
			const setFullName = fullname !== '' ? fullname : 'Anonymous'
			const newUser = new User({ username, password: hashedPassword, fullname: setFullName, avatar, role, signinWith })
			await newUser.save()

			const accessToken = jwt.sign(
				{ userId: newUser._id },
				process.env.ACCESS_TOKEN_SECRET
			)
	
			return res.json({
					success: true,
					message: 'User created successfully',
					accessToken
					})
		}
			
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/avatar', verifyToken, async (req, res) => {
	const {avatar} = req.body

	try {
		let updated = { avatar }

		const UpdateCondition = { _id: req.userId }

		updatedAvatar = await User.findOneAndUpdate(
			UpdateCondition,
			updated,
			{ new: true }
		)

		res.json({
			success: true,
			message: 'Excellent progress!',
			user: updatedAvatar
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/fullname', verifyToken, async (req, res) => {
	const {fullname} = req.body

	try {
		let updated = { fullname }

		const UpdateCondition = { _id: req.userId }

		updatedFullname = await User.findOneAndUpdate(
			UpdateCondition,
			updated,
			{ new: true }
		)

		res.json({
			success: true,
			message: 'Excellent progress!',
			user: updatedFullname
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/password', verifyToken, async (req, res) => {
	const { password, newpassword } = req.body

	try {
		const user = await User.findOne({ _id: req.userId })
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Old Password is Incorrect' })

		const hashedPassword = await argon2.hash(newpassword)
		let updated = { password: hashedPassword }

		const UpdateCondition = { _id: req.userId }

		updatedPassword = await User.findOneAndUpdate(
			UpdateCondition,
			updated,
			{ new: true }
		)

		res.json({
			success: true,
			message: 'Excellent progress!',
			user: updatedPassword
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router