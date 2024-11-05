import { generateUniqueSlug, validType } from "../config/functions.js";
import Thread from "../models/thread_schema.js";
import catchAsync from "../utils/catchAsync.js"

export const getAllThreads = catchAsync(async(req, res, next) => {

})

export const getThread = catchAsync(async(req, res, next) => {

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
        message : "Thread is created successfully. "
    })
})

export const updateThread = catchAsync(async(req, res, next) => {

})

export const deleteThread = catchAsync(async(req, res, next) => {

})
