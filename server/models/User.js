const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	fullname: {
		type: String
	},
	avatar: {
		type: String
	},
	role: {
		type: String,
		enum: ['ADMIN', 'USER']
	},
	signinWith: {
		type: String,
		enum: ['direct', 'indirect']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('users', UserSchema)