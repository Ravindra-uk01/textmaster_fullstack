import User from "../models/user_schema.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const filterObj = (obj, ...allowedFields) =>{
    const newObj = {};
    Object.keys(obj).forEach((el)=>{
      if(allowedFields.includes(el))
        newObj[el] = obj[el];
    })

    return newObj;
}

export const createUser = catchAsync(async (req, res, next) => {

  const allData = req.body;
  const newUser = await User.create(allData);

  return res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: newUser,
    },
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  return res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next)=>{
    const {id} = req.params;
    const {_id, role} = req.user;

    // write a validtype function for authorization so that only admin can delete it 
    // if(validType)

    const user = await User.findByIdAndDelete(id);

    if(!user) {
      return next(new AppError("No User found with this Id.", 400));
    }

    return res.status(200).json({
      status: "success",
      message: "User has been deleted successfully",
      user
    })

})

export const updateProfile = catchAsync(async(req, res, next)=>{
    
    // get the current user and ensure it does not change password from here
      const {_id} = req.user;
      const user = await User.findById(_id);

      if(req.body.password || req.body.confirm_password){
        return next(
          new AppError("Please use forget password link to change the password. ", 400)
        )
      }

      // filtering out the things which we donot want to update
      const filterBody = filterObj(req.body, 'first_name', 'last_name', 'phone', 'photo')

      // updation
      const updatedUser = await User.findByIdAndUpdate(_id, 
        {
          ...filterBody
        },
        {
          new: true,
          runValidators: true
        })

    return res.status(200).json({
      message: "Profile is updated successfully.",
      status : "success",
      data:{
        user: updatedUser
      }
    })
})
