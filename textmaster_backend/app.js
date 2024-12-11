import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import {rateLimit} from 'express-rate-limit';
import mongoSanitize from "express-mongo-sanitize";
import xss from 'xss-clean';
import cookieParser from "cookie-parser";
const app = express();

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import threadRoutes from './routes/threadRoutes.js';
import AppError from "./utils/appError.js";
import {globalErrorHandler} from "./controllers/errorController.js"

// middleware stacks 

// Body parser, reading data from body into req.body
app.use(express.json({ limit : '50kb'}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Data sanitization against NoSql queries - it should always be done after above middleware , when we get data 
app.use(mongoSanitize());  // it prevents from $gt sign or other technique of injection

// Data sanitization against XSS attacks
app.use(xss())  // it prevents from malicious html code 

app.use(express.static(`../textmaster_frontend/index.html`));  // for serving static files


// Define allowed origins
// const allowedOrigins = [
//     "http://localhost:5173", // Development
//     "https://your-production-domain.com" // Production
// ];

// // CORS options
// const corsOptions = {
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true // Allow credentials (cookies, authorization headers)
// };

// // Use CORS middleware with options
// app.use(cors(corsOptions));

app.use(cors({ origin: process.env.FRONTEND_URL , credentials: true}));        // enable secure cross-origin requests between web applications
app.use(helmet());      // Set security HTTP headers
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max : 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour'
})

// routes 
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth',limiter, authRoutes)
app.use('/api/v1/thread', threadRoutes)

app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server!`));
})

//Error handlling middleware
app.use(globalErrorHandler);

export default app;