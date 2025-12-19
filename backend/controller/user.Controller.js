import { catchAsyncErrors } from "../middleware/catchAsyncError";
import ErrorHandler from "../middleware/errorMiddleware";
import { User } from "../models/user.Model";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic, role, doctorDepartment, docAvatar} =req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    let user = await User.findOne({email})
    if(user){
        return next(new ErrorHandler("Email Already Registered", 400));
    } 
    user = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, role, doctorDepartment, docAvatar
    });
    res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        user
    })
});