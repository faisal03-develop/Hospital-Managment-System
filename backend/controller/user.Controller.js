import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/user.Model.js";

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

    export const login = catchAsyncErrors(async(req, res, next) => {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return next(new ErrorHandler("Please Provide All Details", 400));
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Incorrect Password or Email", 400));
        }
        if(user.role !== role){
            return next(new ErrorHandler("User with this role not found", 400));
        }
        const token = await user.generateToken();
        res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            // token
    })
});

// .cookie("token", token, {
//             httpOnly: true,
//             maxAge: 15 * 60 * 1000,
//             sameSite: "none",
//             secure: true
//         })