const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplySchema = new Schema({
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
	},
    comment: {
		type: Schema.Types.ObjectId,
		ref: 'comments'
	}
})

module.exports = mongoose.model('replies', ReplySchema)