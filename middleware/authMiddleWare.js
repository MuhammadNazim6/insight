const asyncHandler = require("express-async-handler");
const auth = asyncHandler(async (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401);
        throw new Error("Please login to continue");
    }
});

const isLogin = async (req,res,next) => {
    try {
        if (req.session.userId) {
            next();
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message)
    }
};

const isLogout = async (req,res,next)=>{
    try {
        if (req.session.userId) {  
            res.redirect('/')
        } else {
            next()
        }
    } catch (error) {
        
    }
}

module.exports={
    auth,
    isLogin,
    isLogout
}