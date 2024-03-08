const express = require("express")
const userController = require('../controller/userController.js')
const visionController = require('../controller/visionController.js')
const userRoute = express.Router()

userRoute.post('/register', userController.registerUser)
userRoute.post('/login', userController.loginUser)
userRoute.post('/logout', userController.logoutUser)
userRoute.post('/create-vision', visionController.createVision)
userRoute.post('/upvote', visionController.upvoteVision)


module.exports = userRoute