import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/applointment.Model.js";
import { User } from "../models/user.Model.js";


export const bookAppointment = catchAsyncErrors(async (req, res, next) => {
    const { a_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;
    if (!a_date || !department || !doctor_firstName  || !doctor_lastName || !hasVisited || !address) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "doctor",
        doctorDepartment: department,
    });
    if(isConflict.length === 0){
        return next(new ErrorHandler("No Doctor found", 404));
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctor's Conflict PLease Contact through Email or Contact the Hsopital for Further Assistance ", 404));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName:req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone : req.user.phone,
        nic: req.user.nic,
        dob: req.user.dob,
        gender: req.user.gender,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        a_date,
        department,
        doctorId,
        patientId,
        hasVisited,
        address,
    });
    res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment,
    });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});