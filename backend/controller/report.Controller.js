import { Report } from "../models/report.model.js";
import { Appointment } from "../models/applointment.model.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

export const getAllReports = catchAsyncErrors(async (req, res, next) => {
    try{
        const reports = await Report.find()
            .populate("patientId")
            .populate("doctorId")
            .populate("appointmentId")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            reports,
        });
    }catch(error){
        return next(new ErrorHandler(`Failed to fetch reports: ${error.message}`, 500));
    }
    });

export const createReport = catchAsyncErrors(async (req, res, next) => {
    const {reportName, diagnosis, symptoms, observations, followUpDate, remarks} = req.body;
    if(!reportName || !diagnosis || !symptoms || !observations || !followUpDate || !remarks)
        return next("Please fill all the fields", 400);
    const appointment = await Appointment.findById(req.params.id);
    if(!appointment){
        return next("Appointment not found", 404);
    }
    const doctorId = req.user._id;
    const appointmentId = req.params.id; 
    const patientId = appointment.patientId;
    try{
        const report = await Report.create({
            reportName,
            diagnosis,
            symptoms,
            observations,
            followUpDate,
            remarks,
            doctorId,
            patientId,
            appointmentId,
        });
        res.status(201).json({
            success: true,
            report,
        });
        appointment.status = "completed";
        await appointment.save(); 
    }catch(error){
        next(`Failed to create report: ${error}`, 500);
    }
});

export const getMyReports = catchAsyncErrors(async (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    const userId = req.params.id;
    if (!userId) {
        return next(new ErrorHandler("Please provide a user id", 400));
        }
    const reports = await Report.find({
    $or: [
      { patientId: userId },
      { doctorId: userId }
    ]
  }).populate("patientId").populate("doctorId").limit(limit);
        res.status(200).json({
            success: true,
            reports,
        });
        if(!reports){
            return next("No reports found", 404);
        }
});

export const getreport = catchAsyncErrors(async (req, res, next) => {
    const Id = req.params.id;
    const report = await Report.find({
        $or: [
            { _id: Id },
            { appointmentId: Id }
        ],
        }).populate("patientId").populate("doctorId");
        res.status(200).json({
            success: true,
            report,
        });
        if(!report){
            return next("No reports found", 404);
        }
});
