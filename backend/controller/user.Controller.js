import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/user.model.js";
import { generateeToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary';


export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic, role, doctorDepartment, docAvatar} =req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    let user = await User.findOne({email, phone, nic})
    if(user){
        return next(new ErrorHandler("Email, Phone or CNIC Already Registered", 400));
    } 
    user = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, role, doctorDepartment, docAvatar
    });
    return generateeToken(user, "User Registered Successfully", 200, res);

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
            return next(new ErrorHandler("No User Found with this email", 400));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        // const token = await user.generateToken();
        return generateeToken(user, "User Logged In Successfully", 200, res);
        
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
    return generateeToken(user, "Admin Registered Successfully", 200, res);
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

// export const logout = catchAsyncErrors(async (req, res, next) => {
//     const { role } = req.query;
//     const tokenMap = {
//         admin: "adminToken",
//         doctor: "doctorToken",
//         patient: "patientToken",
//     };
//     const cookieName = tokenMap[role];
//     if (!cookieName) {
//         return next(new ErrorHandler("Invalid role provided for logout", 400));
//     }
//     res.status(200).cookie(cookieName, "",
//         {
//             httpOnly: true,
//             expires: new Date(Date.now()),
//         })
//         .json({
//             success: true,
//             message: `${role.charAt(0).toUpperCase() + role.slice(1)} Logged Out Successfully`,
//         });
// });

export const logout = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
  
    const tokenMap = {
      admin: "adminToken",
      doctor: "doctorToken",
      patient: "patientToken",
    };
  
    const cookieName = tokenMap[role];
  
    if (!cookieName) {
      return next(new ErrorHandler("Invalid user role", 400));
    }
  
    res
      .status(200)
      .cookie(cookieName, "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
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
        return next(new ErrorHandler("File upload failed", 500));
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
    const limit = req.query.limit || 10;
    const totalUsers = await User.countDocuments();
    const users = await User.find({}).limit(limit).sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        users,
        totalUsers,
        hasMore: totalUsers > limit,
    });
})

export const updateUser = catchAsyncErrors( async(req, res, next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return next(new ErrorHandler("User Not Found", 404));
        }
        const {firstName, lastName, email, phone, password, gender, dob, nic} =  req.body;
        if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
            return next(new ErrorHandler("Please Give all the required Details", 400));
        }
        const updatedUser = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role : user.role
        }, {new: true});
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            updatedUser
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
})


export const getDoctor = catchAsyncErrors(async (req, res, next) => {
  const { department } = req.query;

  if (!department) {
    return next(new ErrorHandler("Please select a department", 400));
  }

  const doctors = await User.find({
    doctorDepartment: department
  });

  if (!doctors.length) {
    if(department === 'dummy'){
        return;
    }
    else{
        return next(new ErrorHandler("No Doctors Found", 404));
    }
  }

  res.status(200).json({
    success: true,
    doctors
  });
});

// export const getDoctor = catchAsyncErrors( async (req, res, next) => {
//     let doctors = [];
//     const department = req.query.department;
//     if(department === '' || undefined || null){
//         return next(new ErrorHandler("Please Select a Department", 400));
//     }
//     if(department === 'Cardiology'){
//         doctors = await User.find({doctorDepartment: department})
//     };
//     if(department === 'Dermatology'){
//         doctors = await User.find({doctorDepartment: department})
//     };
//     if(department === 'Neurology'){
//         doctors = await User.find({doctorDepartment: department})
//     };
//     if(department === 'Pediatrics'){
//         doctors = await User.find({doctorDepartment: department})
//     };
//     if(department === 'Oncology'){
//         doctors = await User.find({doctorDepartment: department})
//     };
//     if(department === 'ENT'){
//         doctors = await User.find({doctorDepartment: department})
//     };
//     if(doctors.length === 0){
//         return next(new ErrorHandler("No Doctors Found", 404));
//     }
//     res.status(200).json({
//         success: true,
//         doctors,
//     })
// })