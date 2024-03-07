const bcrypt = require('bcrypt')
const users = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const { render } = require('ejs');

// use async instead  of try catch 



const securepassword = asyncHandler(async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
})





const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile } = req.body;
    const profile = req.file.filename;
    const hashedPassword = securepassword(password)
    const isUserExists = await users.findOne({ email });
    if (isUserExists) {
        res.status(400)
        throw new Error('this email is already exist');
    } else {
        const newUser = await new users({
            name,
            email,
            hashedPassword,
            profile,
            mobile
        })
        const userDataSaved = await newUser.save()
        if (userDataSaved) {
            res.redirect('/')
        } else {
            throw new Error('FAILED TO SIGNUP')
        }
    }
})


module.exports = {
    registerUser
}