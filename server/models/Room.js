const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
	name: {
		type: String,
        required: true
	},
    date: {
		type: String
	},
    time: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
})

module.exports = mongoose.model('rooms', RoomSchema)