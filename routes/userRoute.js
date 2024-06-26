const express = require("express")
const userController = require('../controller/userController.js')
const visionController = require('../controller/visionController.js')
const keepAliveController = require('../controller/keepAliveController.js')
const userRoute = express.Router()
const imageUpload = require("../middleware/multerMiddleware")
const {auth,isLogin,isLogout} =require('../middleware/authMiddleWare.js')

userRoute.get('/',isLogin,userController.showHome)
userRoute.get('/register',isLogout,userController.showRegister)
userRoute.post('/register',userController.registerUser)
userRoute.get('/pitch',isLogin,userController.showPitchPage)
userRoute.get('/account',isLogin,userController.showAccountPage)

userRoute.get('/login',isLogout,userController.showLogin)
userRoute.post('/login', userController.loginUser)
userRoute.get('/logout',auth, userController.logoutUser)
userRoute.post('/create-vision',auth, visionController.createVision)
userRoute.patch('/upvote',auth, visionController.upvoteVision)
userRoute.patch('/interest',auth, visionController.interestInVision)
userRoute.patch('/comment',auth,visionController.addComment)
userRoute.put('/profile',imageUpload,auth,userController.updateProfile)
userRoute.delete('/delete-vision',auth,visionController.deleteVision)
userRoute.delete('/delete-comment',auth,visionController.deleteComment)
userRoute.put('/edit-vision',auth,visionController.editVision)
userRoute.post('/send-message',auth,visionController.sendMessage)
userRoute.get('/get-message/:visionId',auth,visionController.getMessages)

userRoute.get('/make-connection',auth,keepAliveController.makeConnection)


module.exports = userRoute