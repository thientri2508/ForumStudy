const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	file: {
		type: String,
		required: false
	},
    createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
    topic: {
		type: Schema.Types.ObjectId,
		ref: 'topics'
	}
})

module.exports = mongoose.model('posts', PostSchema)