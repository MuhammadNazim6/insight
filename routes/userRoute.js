const express = require("express")
const userController = require('../controller/userController')
const userRoute = express.Router()

const imageUpload = require("../middleware/multerMiddleware")

userRoute.get('/register',userController.showRegister)
userRoute.post('/register',imageUpload,userController.registerUser)
userRoute.post('/login',userController.loginUser)
userRoute.post('/logout',userController.logoutUser)


module.exports = userRoute