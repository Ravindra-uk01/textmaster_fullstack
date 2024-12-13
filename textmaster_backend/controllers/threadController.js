import { generateUniqueSlug, validType } from "../config/functions.js";
import Thread from "../models/thread_schema.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllThreads = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;

  if (!validType(role, ["user", "admin"])) {
    return next(new AppError(401, "Unauthorized User"));
  }

  const { search, filter } = req.query;

  const query = {
    created_by: _id,
  };

  if (filter === "bookmarked") {
    query.bookmarked = true;
  }

  if (search && search.trim()) {
    query.$or = [
      { title: { $regex: search, $options: "i" } }, 
      { description: { $regex: search, $options: "i" } }, 
    ];
  }

  const allThreads = await Thread.find(query).sort({ createdAt: -1 });


  return res.status(200).json({
    status: "success",
    message: "All Threads have been fetched Successfully. ",
    allThreads,
  });
});

export const getThread = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { _id, role } = req.user;

  if (!validType(role, ["user", "admin"])) {
    return next(new AppError(401, "Unauthorized User"));
  }

  const thread = await Thread.findOne({ 
    slug: slug , 
    $or: [
      { created_by: _id }, // If created_by is me
      { visibility: "everyone" } // If not created by me, must be "everyone"
  ]
  });

  if (!thread) {
    return next(new AppError(404, "No Thread found."));
  }

  return res.status(200).json({
    status: "success",
    message: "Thread fetched successfully. ",
    thread,
  });
});

export const addThread = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;

  if (!validType(role, ["user", "admin"])) {
    return next(new AppError(401, "Unauthorized User"));
  }

  const { title } = req.body;
  const slug = await generateUniqueSlug(title, Thread);

  const thread = await Thread.create({
    ...req.body,
    slug: slug,
    created_by: _id,
  });

  return res.status(200).json({
    status: "success",
    message: "Thread is created successfully. ",
    slug: slug,
  });
});

export const updateThread = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;

  if (!validType(role, ["user", "admin"])) {
    return next(new AppError(401, "Unauthorized User"));
  }

  const { slug } = req.params;
  const { ...allData } = req.body;

  const thread = await Thread.findOne({ slug: slug });

  if (!thread) {
    return next(new AppError(404, "No Thread found."));
  }

  if (thread.created_by.toString() !== _id.toString()) {
    return next(
      new AppError(400, "You are not authorised to update this thread.")
    );
  }

  const updatedThread = await Thread.findOneAndUpdate(
    { slug: slug },
    {
      ...allData,
    },
    {
      new: true,
      runValidators: true,
    }
  );


  return res.status(200).json({
    status: "success",
    message: "Updated Thread successfully. ",
    updatedThread,
  });
});

export const deleteThread = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  const { slug } = req.params;

  const thread = await Thread.findOne({ slug: slug });

  if (!thread) {
    return next(new AppError(404, "No Thread found."));
  }

  if (thread.created_by.toString() !== _id.toString()) {
    return next(
      new AppError(400, "You are not authorised to Delete this thread.")
    );
  }

  const deleteThread = await Thread.findOneAndDelete({ slug: slug });

  return res.status(200).json({
    status: "success",
    message: "Thread is deleted successfully. ",
  });
});

export const toggleThreadBookmark = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  const { slug } = req.params;

  const thread = await Thread.findOne({ slug: slug });

  if (!thread) {
    return next(new AppError(404, "No Thread found."));
  }

  if (thread.created_by.toString() !== _id.toString()) {
    return next(
      new AppError(400, "You are not authorised to update this thread.")
    );
  }

  thread.bookmarked = !thread.bookmarked;
  thread.save();

  return res.status(200).json({
    status: "success",
    message: "Thread is updated successfully. ",
    thread,
  });
});

export const deleteMultipleThreads = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  const { threadType } = req.params;

  const query = {
    created_by: _id,
  };

  if (threadType === "unBookmarked") {
    query.bookmarked = false;
  }

  const allThreads = await Thread.deleteMany(query);

  if (allThreads.deletedCount > 0) {
    return res
      .status(200)
      .json({
        status: "success",
        message: `${allThreads.deletedCount} threads deleted successfully.`,
      });
  } else {
    return res
      .status(404)
      .json({ status: "success", message: "No threads found to delete." });
  }
});
