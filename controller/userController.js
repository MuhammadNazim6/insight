const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const Vision = require("../models/visionModel.js");
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

    const user = await User.findById(req.session.userId)
    const profile = req?.file?.filename ? `/images/profile/${req.file.filename}` : null
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.mobile = req.body.mobile || user.mobile
        user.bio = req.body.bio || user.bio 
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
                message: "Profile updated successfully"
            })
        }

    } else {
        throw new Error('No user found')
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    req.session.destroy();

    res.json({status:'success', message: "User logged out" });
}); 
  

const showPitchPage = asyncHandler(async (req, res) => {
    const visions = await Vision.find()
    .populate('userId')

    res.render('user/pitch',{visions,userId:req.session.userId})
})


const showAccountPage = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id:req.session.userId})
    const visions = await Vision.find({userId:req.session.userId})
    .populate('interested.userId')
    .exec()

    console.log(visions);
    console.log(user);
    res.render('user/account',{user , visions })
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
