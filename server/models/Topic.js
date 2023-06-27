const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	image: {
		type: String
	},
    user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
})

module.exports = mongoose.model('topics', TopicSchema)