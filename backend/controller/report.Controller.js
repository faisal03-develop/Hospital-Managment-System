import { Report } from "../models/report.Model.js";
import { Appointment } from "../models/applointment.Model.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";


export const getAllReports = catchAsyncErrors(async (req, res, next) => {
    try{
        const reports = await Report.find();
        res.status(200).json({
            success: true,
            reports,
        });
    }catch(error){
        next(`Failed to fetch reports: ${error}`, 500);
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
    }catch(error){
        next(`Failed to create report: ${error}`, 500);
    }

});