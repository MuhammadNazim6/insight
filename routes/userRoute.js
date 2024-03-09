const express = require("express")
const userController = require('../controller/userController.js')
const visionController = require('../controller/visionController.js')
const keepAliveController = require('../controller/keepAliveController.js')
const userRoute = express.Router()
const imageUpload = require("../middleware/multerMiddleware")


userRoute.get('/',userController.showHome)
userRoute.get('/register',userController.showRegister)
userRoute.post('/register',userController.registerUser)
userRoute.get('/pitch',userController.showPitchPage)
userRoute.get('/account',userController.showAccountPage)

userRoute.get('/login',userController.showLogin)
userRoute.post('/login', userController.loginUser)
userRoute.post('/logout', userController.logoutUser)
userRoute.post('/create-vision', visionController.createVision)
userRoute.patch('/upvote', visionController.upvoteVision)
userRoute.patch('/interest', visionController.interestInVision)
userRoute.patch('/comment',visionController.addComment)
userRoute.put('/profile',userController.updateProfile)
userRoute.delete('/delete',visionController.deleteVision)

userRoute.get('/make-connection',keepAliveController.makeConnection)


module.exports = userRoute