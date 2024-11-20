import AppError from "../utils/appError.js";

const handleCasteErrorDb = (error)=>{
    let message = `Invalid ${error.path} = ${error.value}`;
    return new AppError(message, 400);
}

const handleDuplicateFieldDb = (error)=>{
    const value = error.errorResponse.errmsg.match(/(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/)[0];
    let message = `Duplicate field value : ${value}. Please use another value `;
    return new AppError(message, 400);
}

const handleValidationErrorDb = (error) =>{
    const errors = Object.values(error.errors).map((err)=> err.message);
    const message = `Invalid Input Data. ${errors.join(' ')} `;
    return new AppError(message, 400);
}

const handleJsonWebTokenError = () => {
    const message = `Invalid Token , Please login Again!`;
    return new AppError(message, 400);
}

const handleTokenExpiredError = () => {
    const message = `Token Expired , Please login Again!`;
    return new AppError(message, 400);
}

const sendErrorToDev = (err, res) =>{
    return res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        error : err,
        stack : err.stack
    })
}

const sendErrorToProd = (err, res) =>{
    
    // Operational Error :- Trusted Error , send message to client
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status : err.statusCode || 'error',
            message : err.message
        })

    // Programming or other unknown error : don't leak error details
    }else{
        console.error('ERROR 💥', err);
        return res.status(500).json({
            status : 'error',
            error : err,
            message : "System Internal Error"
        })
    }
}

export const globalErrorHandler =  (err, req, res, next)=>{ 
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    
    if(process.env.NODE_ENV === 'development'){

        sendErrorToDev(err, res);
    }
    else if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        error.name = err.name;
        error.message = err.message;

        if(error.name === 'CastError') error = handleCasteErrorDb(error);
        if(error.code === 11000) error = handleDuplicateFieldDb(error);
        if(error.name === "ValidationError") error = handleValidationErrorDb(error);
        if(error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
        if(error.name === "TokenExpiredError") error = handleTokenExpiredError();
        sendErrorToProd(error, res);
    }
};
