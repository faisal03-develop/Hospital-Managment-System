import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
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
        password:{
            type: String,
            required: true,
            minLength: [8, "Password must contain at least 8 characters"],
            maxLength: [32, "Password must contain at most 32 characters"],
            select: false
        },
        role:{
            type: String,
            enum: ["admin", "patient", "doctor"],
            default: "patient",
            required: true
        },
        doctorDepartment:{
            type: String,
            enum: ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Oncology", "Orthopedics", "ENT"]
        },
        docAvatar:{
            public_id: String,
            url: String
        }
    });

    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
            next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    })

    userSchema.pre("findOneAndUpdate", async function() {
    const update = this.getUpdate();
    if (update.password) {
        const hashed = await bcrypt.hash(update.password, 10);
        update.password = hashed;
    }
});



    userSchema.methods.comparePassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    userSchema.methods.generateToken = async function () {
        return jwt.sign({id: this._id}, process.env.JWT_SECRETKEY, {
            expiresIn: process.env.JWT_EXPIRES
        })
    }


export const User = mongoose.model("User", userSchema);