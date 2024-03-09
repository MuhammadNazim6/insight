const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

// use asyncHandler instead  of try catch


const securepassword = asyncHandler(async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
})

const showHome = asyncHandler(async (req, res) => {
    res.render('user/home')
})

const showRegister = asyncHandler(async (req, res) => {
    res.render('user/signup')
})


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile } = req.body;
    // const profile = req.file.filename;
    const hashedPassword = await securepassword(password)
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        res.status(400);
        throw new Error("This email already exists");
    } else {
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            // profile,
            mobile
        })
        const userDataSaved = await newUser.save()
        if (userDataSaved) {
            req.session.userId = userDataSaved._id
            res.json({ status: "success", message: "User register successfull" });
        } else {
            throw new Error("FAILED TO SIGNUP");
        }
    }
});

const showLogin = asyncHandler(async (req, res) => {
    res.render('user/login')
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id
            console.log(user.name, 'Logged in')
            res.json({ status: "success", message: 'User login successfull' })
        } else {
            res.status(401)
            throw new Error('Email or Password is incorrect')
        }
    } else {
        res.status(401)
        throw new Error('Email or Password is incorrect')
    }


})


const updateProfile = asyncHandler(async (req, res) => {

    const profile = req?.file?.filename;

    const user = await User.findById(req.session.userId)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.mobile = req.body.mobile || user.mobile
        if (profile) {
            user.profile = profile
        }

        if (req.body.password) {
            const hashedPassword = await securepassword(req.body.password)
            user.password = hashedPassword
        }
        const updatedUser = await user.save();
        if (updatedUser) {
            res.status(200).json({
                status: 'success',
                message: "Porfile updated successfully"
            })
        }

    } else {
        throw new Error('No user found')
    }




})

const logoutUser = asyncHandler(async (req, res) => {
    req.session.destroy();

    res.json({ message: "User logged out" });
});


const showPitchPage = asyncHandler(async (req, res) => {
    res.render('user/pitch')
})


const showAccountPage = asyncHandler(async (req, res) => {
    res.render('user/account')
})

module.exports = {
    showHome,
    showRegister,
    registerUser,
    showLogin,
    loginUser,
    logoutUser,
    updateProfile,
    showPitchPage,
    showAccountPage
};
