const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const path = require('path')

const assetsFolder = path.join(__dirname, "assets")

router.use(fileUpload())

router.post('/', async (req, res) => {
	const { avatar } = req.files
	await avatar.mv(path.join(assetsFolder, avatar.name))
	res.status(200).json({ success: true })
})

router.get('/file/:filename', (req, res) => { 
	const imagePath = path.join(__dirname, 'assets', req.params.filename);
  	res.sendFile(imagePath);
})

module.exports = router