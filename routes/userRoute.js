const express = require("express")
const userController = require('../controller/userController.js')
const visionController = require('../controller/visionController.js')
const userRoute = express.Router()
const imageUpload = require("../middleware/multerMiddleware")


userRoute.get('/',userController.showHome)
userRoute.get('/register',userController.showRegister)
userRoute.post('/register',userController.registerUser)

userRoute.get('/login',userController.showLogin)
userRoute.post('/login', userController.loginUser)
userRoute.post('/logout', userController.logoutUser)
userRoute.post('/create-vision', visionController.createVision)
userRoute.patch('/upvote', visionController.upvoteVision)
userRoute.patch('/interest', visionController.interestInVision)


module.exports = userRoute