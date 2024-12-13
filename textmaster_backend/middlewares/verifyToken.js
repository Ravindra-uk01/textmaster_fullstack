import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/user_schema.js";

export const verifyToken = catchAsync(async(req, res, next) =>{
    
    let token ;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(' ')[1];
    // }

    token = req.cookies.accessToken;

    if(!token){
        return next(new AppError(401,"You are not logged in! please log in to get access."));
    }

    // Verification of token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decode){
        return next(new AppError(400, "Token is not valid."));
    }

    // checking if user exists 
    const {_id, iat }  = decode;
    const user = await User.findById(_id);

    if(!user){
        return next(new AppError(404, "The user belonging to this token does no longer exists."));
    }

    // checking if user has changed the password after the token is assigned
    if(user.changedPasswordAfter(iat)){
        return next(new AppError(400, "User Changed the password, Please login again."));
    }

    req.user = user;
    next();
})