const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
	content: {
		type: String
	},
    createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
    post: {
		type: Schema.Types.ObjectId,
		ref: 'posts'
	}
})

module.exports = mongoose.model('comments', CommentSchema)