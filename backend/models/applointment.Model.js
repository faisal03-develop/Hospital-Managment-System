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
        doctor:{
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        hasVisited:{
            type: Boolean,
            default: false
        },
        doctorId:{
            type: mongoose.Schema.ObjectId,
            ref: "Doctor",
        },
        patientId:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        address:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    });

    export const Appointment = mongoose.model("Appointment", appointmentSchema);