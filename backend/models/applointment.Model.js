import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
        a_date:{
            type: Date,
            required: [true, "Appointment date is required"],
        },
        department:{
            type: String,
            required: true,
            enum: ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Oncology", "Orthopedics", "ENT"]
        },
        hasVisited:{
            type: Boolean,
            default: false
        },
        doctorId:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "DoctorId is required"],
        },
        patientId:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "PatientId is required"],
        },
        address:{
            type: String,
            required: [true, "Address is required"],
        },
        status:{
            type: String,
            enum: ["pending", "accepted", "rejected", "completed"],
            default: "pending"
        }
    },
        {
            timestamps: true,
  }
);

    export const Appointment = mongoose.model("Appointment", appointmentSchema);