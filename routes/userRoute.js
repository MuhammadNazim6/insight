const express = require("express")
const userController = require('../controller/userController.js')
const visionController = require('../controller/visionController.js')
const userRoute = express.Router()

<<<<<<< HEAD
userRoute.post('/register', userController.registerUser)
userRoute.post('/login', userController.loginUser)
userRoute.post('/logout', userController.logoutUser)
userRoute.post('/create-vision', visionController.createVision)
userRoute.post('/upvote', visionController.upvoteVision)
=======
const imageUpload = require("../middleware/multerMiddleware")

userRoute.get('/register',userController.showRegister)
userRoute.post('/register',imageUpload,userController.registerUser)
userRoute.post('/login',userController.loginUser)
userRoute.post('/logout',userController.logoutUser)
>>>>>>> sabith


module.exports = userRoute