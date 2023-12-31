require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*", methods: [ "GET", "POST" ]}})
const mongoose = require('mongoose')
const cors = require('cors')

const topicRouter = require('./routes/topic')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const replyRouter = require('./routes/reply')
const likeRouter = require('./routes/like')
const notificationRouter = require('./routes/notification')
const roomRouter = require('./routes/room')
const uploadRouter = require('./upload')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@forum-study.ggmapi6.mongodb.net/?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/topics', topicRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)
app.use('/api/notifications', notificationRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/replies', replyRouter)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))

io.on("connection", (socket) => {
	socket.on('commented', (comment) => {
		socket.emit('updateComment', comment)
		socket.broadcast.emit('updateComment', comment)
	})

	socket.on('reply', (reply) => {
		socket.emit('updateReply', reply)
		socket.broadcast.emit('updateReply', reply)
	})

	socket.on('notification', (notification) => {
		socket.emit('updateNotification', notification)
		socket.broadcast.emit('updateNotification', notification)
	})
})
