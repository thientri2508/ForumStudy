const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	content: {
		type: String,
		required: true
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