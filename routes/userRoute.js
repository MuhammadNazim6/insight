const express = require("express")
const userController = require('../controller/userController')
const userRoute = express.Router()

userRoute.post('/register',userController.registerUser)
userRoute.post('/login',userController.loginUser)
userRoute.post('/logout',userController.logoutUser)


module.exports = userRoute