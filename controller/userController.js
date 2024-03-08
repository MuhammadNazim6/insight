const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

// use asyncHandler instead  of try catch

const securepassword = asyncHandler(async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
})

const showRegister = asyncHandler(async (req,res)=>{
    res.render('user/signup')
})


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile } = req.body;
    const profile = req.file.filename;
    const hashedPassword = await securepassword(password)
    const isUserExists = await Users.findOne({ email });
    if (isUserExists) {
        res.status(400);
        throw new Error("This email already exists");
    } else {
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            profile,
            mobile
        })
        const userDataSaved = await newUser.save()
        if (userDataSaved) {
            res.json({ message: "User register successfull" });
        } else {
            throw new Error("FAILED TO SIGNUP");
        }
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user){
        if(await bcrypt.compare(password, user.password)){
            req.session.user = {
                _id:user._id,
                email:user.email,
                name:user.name
            }
            res.json({status:"success",message:'User login successfull'})
        }else{
            res.status=401
            throw new Error('Email or Password is incorrect')
        }
    }else{
        res.status=401
        throw new Error('Email or Password is incorrect')
    }

    
})

const logoutUser = asyncHandler(async (req, res) => {
    req.session.destroy();

    res.json({ message: "User logged out" });
});




module.exports = {
    showRegister,
    registerUser,
    loginUser,
    logoutUser,
};
