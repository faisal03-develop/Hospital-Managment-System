import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/user.Model.js";
import { generateeToken } from "../utils/jwtToken.js";

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
    generateeToken(user, "User Registered Successfully", 200, res);

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
        // const token = await user.generateToken();
        generateeToken(user, "User Logged In Successfully", 200, res);
        
});

export const addNewAdmin = catchAsyncErrors(async(req, res ,next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic, role} =req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    let user = await User.findOne({email})
    if(user){
        return next(new ErrorHandler("Email Already Registered", 400));
    }
    user = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, role:"admin"
    });
    generateeToken(user, "Admin Registered Successfully", 200, res);
})

export const findAllDoctors = catchAsyncErrors( async(req, res, next) => {
    const doctors = await User.find({role: "doctor"});
    res.status(200).json({
        success: true,
        doctors,
    })
})

export const getUserDetails = catchAsyncErrors( async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})