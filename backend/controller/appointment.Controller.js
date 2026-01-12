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

  if (!isNotPastDate(a_date)) {
    return next(new ErrorHandler("Appointment date cannot be in the past", 400));
  }

  const patientId = req.user._id;

  const [doctorCount, patientCount] = await Promise.all([
    Appointment.countDocuments({ doctorId, a_date }),
    Appointment.countDocuments({ patientId, a_date })
  ]);

  if (doctorCount >= 3) {
    return next(new ErrorHandler("Sorry, Appointment for today are alreadyfull", 400));
  }

  if (patientCount >= 1) {
    return next(new ErrorHandler("You have already booked an appointment for this date", 400));
  }

  const appointment = await Appointment.create({
    a_date,
    department,
    doctorId,
    patientId,
    hasVisited,
    address
  });

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully",
    appointment
  });
});


export const getMyAppointments = catchAsyncErrors( async (req, res, next) => {
    const limit = req.query.limit || 5;
    const totalAppointments = await Appointment.countDocuments({ patientId: req.user._id });
    // const appointments = await Appointment.find({ patientId: req.user._id }).limit(limit).sort({ createdAt: -1 }).populate("patientId").populate("doctorId");
    const upcommingAppointments = await Appointment.find({ patientId: req.user._id, a_date: { $gte: new Date() } }).sort({ a_date: 1 }).limit(limit).populate("patientId").populate("doctorId");
    res.status(200).json({
        success: true,
        // appointments,
        totalAppointments,
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
    .limit(limit).populate("patientId").populate("doctorId");
    }
    if(req.query.status === 'accepted'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "accepted" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId").populate("doctorId");
    }
    if(req.query.status === 'rejected'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "rejected" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId").populate("doctorId");
    }
    if(req.query.status === 'completed'){
        appointments = await Appointment.find({ doctorId: req.user._id, status: "completed" }).sort({ createdAt: -1 })
    .limit(limit).populate("patientId").populate("doctorId");
    }
    if(req.query.status === 'all'){
        appointments = await Appointment.find({ doctorId: req.user._id }).sort({ a_date: 1 }).limit(limit).populate("patientId").populate("doctorId");
    };
    if(appointments.length === 0){
        return next(new ErrorHandler("No Appointments Found", 404));
    }
    res.status(200).json({
        success: true,
        appointments,
        totalAppointment,
        pendingTasks
    });
});