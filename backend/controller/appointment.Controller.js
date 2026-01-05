import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/applointment.Model.js";
import { User } from "../models/user.Model.js";
import {isToday} from "../utils/dateUtils.js";



export const bookAppointment = catchAsyncErrors(async (req, res, next) => {
    const { a_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;
    if (!a_date || !department || !doctor_firstName  || !doctor_lastName || hasVisited === undefined || !address) {
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

export const getMyAppointments = catchAsyncErrors( async (req, res, next) => {
    const appointments = await Appointment.find({ patientId: req.user._id });
    res.status(200).json({
        success: true,
        appointments,
    });
    if(!appointments){
        return next(new ErrorHandler("No Appointments Found", 404));
    }
})

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});


export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Appointment status updated",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
    });
});


export const getAppointments = catchAsyncErrors( async (req, res, next) => {
    const appointments = await Appointment.find({ doctorId: req.user._id });
    const todayAppointments = appointments.filter((appointment) => isToday(appointment.a_date));
    if(appointments.length === 0){
        return next(new ErrorHandler("No Appointments Found", 404));
    }
    res.status(200).json({
        success: true,
        appointments,
        todayAppointments,
    });
})