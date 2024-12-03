import User from "../models/user_schema.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/email.js";


const signToken = (data)=>{
    const token = jwt.sign(data, `${process.env.JWT_SECRET_KEY}`, {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRES_IN
    }) 
    return token;
}

const createAndSendToken = (user, statusCode, res, message)=>{
    const data = {
        _id : user._id,
        email: user.email
    }

    const token = signToken(data);
    user.password = undefined;

    // res.set('Authorization', `Bearer ${token}`);
    res.cookie("accessToken", token, {
        httpOnly: true,
    })

    return res.status(statusCode).json({
        status: "success",
        message,
        token,
        user
    })
}

export const login = catchAsync(async(req, res, next)=>{

    const {email , password } = req.body;
    
    if(!email || !password){
        return next(new AppError("Email and password is required", 401));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.checkPassword(password, user.password))){
        return next(new AppError("Invalid login Credentials!! ", 401));
    }

    createAndSendToken(user, 200, res, "logged in Successfully")
})


export const signup = catchAsync(async(req, res, next)=>{

    const {email , password , confirm_password, first_name, last_name} = req.body;

    const exists = await User.findOne({email});

    if(exists){
        return next(new AppError("This email is already registered.", 400));
    }

    const newUser = await User.create({
        email,
        password,
        confirm_password,
        passwordChangedAt: new Date(),
        first_name,
        last_name
    });

    newUser.password = undefined;
    newUser.passwordChangedAt = undefined;

    createAndSendToken(newUser, 201, res, "User Signup Successfully");
})

export const logout = async(req, res, next) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
    })
    .status(200).json({
        status : "success",
        message: "User has been logged out successfully."
    })
}

export const forgetPassword = catchAsync(async(req, res, next) =>{

    // 1) Get user whose password needs to be changed
        const currentUser = await User.findOne({email: req.body.email});

        if(!currentUser){
            return next(new AppError("No user found with this email Id.", 404));
        }

    // 2) Generate the resetToken 
        const resetToken = currentUser.createPasswordResetToken();
        currentUser.save({validateBeforeSave: false});

    // 3) Send the resetToken in mail 
        try {
            // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
            const resetUrl = `${process.env.FRONTEND_URL}/reset_password/${resetToken}`;
            // const message = `Forgot your password ? click here : ${resetUrl}. \n If you didn't forget your password , Please Ignore this mail.`
            const message =  `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetUrl}">Reset Password</a></p>`;

            console.log('reset url is ', resetUrl)

            await sendEmail({
                email : currentUser.email,
                subject : "Your password reset token (valid for 10 min)",
                message : message
            })

            res.status(200).json({
                status : 'success',
                message : "We have sent you an e-mail. Please contact us if you do not receive it within a few minutes." 
            })
        } catch (error) {
            currentUser.passwordResetToken = undefined;
            currentUser.passwordResetTokenExpiresIn = undefined;
            currentUser.save({validateBeforeSave: false});

            return next(
                new AppError(`There was an error sending the email, please try again later! , ${error}`),
                500
            )
        }
})


export const resetPassword = catchAsync( async(req, res, next) =>{

    // 1) Get user based on the token
        const {token } = req.params;
        const {password, confirm_password} = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
             passwordResetToken: hashedToken,
             passwordResetTokenExpiresIn : {$gt: Date.now()}
        })

        console.log("user password expires in ", user )
        console.log('current date ', Date.now());

    // 2) if token has not expired and there is user, set the new password
        if(!user){
            return next(
                new AppError("Reset Token is Invalid or Expired ", 400)
            )
        }
        
        user.password = password;
        user.confirm_password = confirm_password;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiresIn = undefined;
        await user.save(); 

    // 3) update changedPasswordAt property in user
        user.passwordChangedAt = new Date();

    // 4) Log the user in , send Jwt
        createAndSendToken(user, 200, res, "Your password has been reset successfully.");
        
})

export const updatePasssword = catchAsync(async(req, res, next)=>{
    // Get the user 
    const {_id} = req.user;
    const {older_password, password, confirm_password} = req.body;

    const user = await User.findById(_id).select('+password');

    // match the current password 
    if(!(await user.checkPassword(older_password, user.password))){
        return next(
            new AppError('Your current password is wrong ',401)
        )
    }

    // update the password 
    user.password = password;
    user.confirm_password = confirm_password;
    await user.save();           // user.findByIdAndUpdate will not work as intended due to structure of user_schema

    // send jwt token 
    createAndSendToken(user, 200, res, "Password updated Successfully");
})

export const getMyProfile = catchAsync(async(req, res, next) => {

    let token ;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(' ')[1];
    // }

    if(req.headers[token] || req.cookies.accessToken){
        token = req.headers[token] || req.cookies.accessToken;
    }

    // console.log('req.headers is ', req.headers[token]);
    // console.log('req.cookies is ', req.cookies.accessToken);

    if(!token){
        return next(new AppError("You are not logged in! please log in to get access.", 401));
    }

    // console.log('token is ', token)

    // Verification of token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decode){
        return next(new AppError("Token is not valid.", 401));
    }

    // checking if user exists 
    const {_id, iat }  = decode;
    const user = await User.findById(_id);

    if(!user){
        return next(new AppError("The user belonging to this token does no longer exists.", 401));
    }

    // checking if user has changed the password after the token is assigned
    if(user.changedPasswordAfter(iat)){
        return next(new AppError("User Changed the password, Please login again.", 401));
    }

    return res.status(200).json({
        status: "success",
        user,
        message:  "Profile fetched successfully."
    })
})