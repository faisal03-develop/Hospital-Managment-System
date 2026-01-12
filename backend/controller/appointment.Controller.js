import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/applointment.Model.js";
import { User } from "../models/user.Model.js";
import {isNotPastDate, isToday} from "../utils/dateUtils.js";


export const bookAppointment = catchAsyncErrors(async (req, res, next) => {
    const { a_date, department, doctorId, hasVisited, address } = req.body;
    if (!a_date || !department || !doctorId || hasVisited === undefined || !address) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    if (!isNotPastDate(req.body.a_date)) {
        return next("Appointment date cannot be in the past", 400);
    }
    const patientId = req.user._id;
    const appointment = await Appointment.create({
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
    const appointments = await Appointment.find({ patientId: req.user._id }).populate("patientId").populate("doctorId");
    const upcommingAppointments = await Appointment.find({ patientId: req.user._id, a_date: { $gte: new Date() } }).populate("patientId").populate("doctorId");
    res.status(200).json({
        success: true,
        appointments,
        upcommingAppointments
    });
    if(!appointments){
        return next(new ErrorHandler("No Appointments Found", 404));
    }
})

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find().populate("patientId").populate("doctorId");
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
    let appointments = [];
    const totalAppointment = await Appointment.countDocuments();
    const pendingTasks = await Appointment.countDocuments({ status: "pending" });
    const limit = Number(req.query.limit) || 5;
    if(req.query.status === 'pending'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "pending" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId");
    }
    if(req.query.status === 'accepted'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "accepted" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId");
    }
    if(req.query.status === 'rejected'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "rejected" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId");
    }
    if(req.query.status === 'completed'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "completed" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId");
    }
    if(req.query.status === 'all'){
        appointments = await Appointment.find({ doctorId: req.user._id }).sort({ a_date: 1 }).limit(limit).populate("patientId");
    };
    // appointments = await Appointment.find({ doctorId: req.user._id }).populate("patientId");
    // const todayAppointments = appointments.filter((appointment.a_date) => isToday(appointment.a_date)).populate("patientId");
    if(appointments.length === 0){
        return next(new ErrorHandler("No Appointments Found", 404));
    }
    // console.log(`todayAppointments: `todayAppoiztments)
    res.status(200).json({
        success: true,
        appointments,
        totalAppointment,
        pendingTasks
    });
});