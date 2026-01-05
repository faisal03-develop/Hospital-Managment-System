import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must contain at least 3 characters"]
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Last name must contain at least 3 characters"]
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Please provide a valid email"]
        },
        phone: {
            type: String,
            required: true,
            minLength: [11, "Phone number must contain at least 11 characters"],
            maxLength: [11, "Phone number must contain at most 11 characters"]
        },
        nic: {
            type: String,
            required: true,
            minLength: [13, "CNIC must contain at least 11 characters"],
            maxLength: [13, "CNIC must contain at most 11 characters"]
        },
        dob:{
            type: Date,
            required: [true, "DOB is required"],
        },
        gender:{
            type: String,
            required: true,
            enum: ["male", "female", "other"]
        },
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