import { generateUniqueSlug, validType } from "../config/functions.js";
import Thread from "../models/thread_schema.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js"

export const getAllThreads = catchAsync(async(req, res, next) => {
    const {_id, role} = req.user;

    if(!validType(role, ["user", "admin"])){
        res.status(401).json({
            status : "warning",
            message: "Unauthorized User"
        })
    }

    const allThreads = await Thread.find({created_by: _id}).sort({createdAt: -1});

    if(allThreads.length <= 0){
        return next(new AppError("Currently, you do not have any threads in your account.", 401) );
    }

    return res.status(200).json({
        status : "success",
        message : "All Threads have been fetched Successfully. ",
        allThreads
    })
})

export const getThread = catchAsync(async(req, res, next) => {

    const {slug} = req.params;
    const thread = await Thread.findOne({slug: slug});

    if(!thread){
        return next(new AppError("No Thread found.", 400) );
    }

    return res.status(200).json({
        status : "success",
        message : "Thread fetched successfully. ",
        thread
    })
})

export const addThread = catchAsync(async(req, res, next) => {
    const {_id, role} = req.user;

    if(!validType(role, ["user", "admin"])){
        res.status(401).json({
            status : "warning",
            message: "Unauthorized User"
        })
    }

    const {title} = req.body;
    const slug = await generateUniqueSlug(title, Thread);

    const thread = await Thread.create({
        ...req.body,
        slug : slug,
        created_by: _id, 
    })

    return res.status(200).json({
        status: "success",
        message : "Thread is created successfully. ",
        slug: slug
    })
})

export const updateThread = catchAsync(async(req, res, next) => {
    const {_id, role} = req.user;

    const {slug} = req.params;
    const {...allData} = req.body;

    const thread = await Thread.findOne({slug: slug});

    if(!thread){
        return next(new AppError("No Thread found.", 400) );
    }

    if(thread.created_by.toString() !== _id.toString()){
        return next(new AppError("You are not authorised to update this thread.", 400) )
    }

    const updatedThread = await Thread.findOneAndUpdate(
        {slug: slug},
        {
            ...allData
        },{
            new: true,
            runValidators: true
        }
    )

    return res.status(200).json({
        status : "success",
        message : "Updated Thread successfully. ",
        updatedThread
    })
})

export const deleteThread = catchAsync(async(req, res, next) => {

})
