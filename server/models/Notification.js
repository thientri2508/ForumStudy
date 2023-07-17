const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
	receiver: {
		type: String
	},
    sender: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
    post: {
		type: Schema.Types.ObjectId,
		ref: 'posts'
	},
    message: {
		type: String
	},
    date: {
		type: String
	},
    status: {
		type: String
	}
})

module.exports = mongoose.model('notifications', NotificationSchema)