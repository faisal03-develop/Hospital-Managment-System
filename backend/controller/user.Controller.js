import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/user.Model.js";
import { generateeToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary';


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

//     export const login = catchAsyncErrors(async(req, res, next) => {
//         const {email, password, role} = req.body;
//         if(!email || !password || !role){
//             return next(new ErrorHandler("Please Provide All Details", 400));
//         }
//         const user = await User.findOne({email}).select("+password");
//         if(!user){
//             return next(new ErrorHandler("Invalid Credentials", 400));
//         }
//         const isPasswordMatched = await user.comparePassword(password);
//         if(!isPasswordMatched){
//             return next(new ErrorHandler("Incorrect Password or Email", 400));
//         }
//         if(user.role !== role){
//             return next(new ErrorHandler("User with this role not found", 400));
//         }
//         // const token = await user.generateToken();
//         generateeToken(user, "User Logged In Successfully", 200, res);
        
// });


    export const login = catchAsyncErrors(async(req, res, next) => {
        const {email, password} = req.body;
        if(!email || !password){
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

export const adminLogout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin Logged Out Successfully"
    })
})


export const userLogout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
});

export const doctorLogout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("doctorToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Doctor Logged Out Successfully"
    })
});

export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        console.log(req.files);
        return next(new ErrorHandler("Doctor Avatar Required", 400));
    }
    const docAvatar = req.files.docAvatar;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported", 400));
    }
    const {firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment} =req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Email Already Registered", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Cloudinary Error");
    }
    const doctor = await User.create({
        firstName, lastName, email, phone, password, role:"doctor", gender, dob, nic, doctorDepartment, docAvatar:{
            public_id: cloudinaryResponse.public_id, 
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor
    });
});

export const getAllUsers = catchAsyncErrors( async(req, res, next) => {
    try{
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
})