import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.Model.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
        return next(new ErrorHandler("No Admin Token to authenticate", 401));
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRETKEY);
    req.user = await User.findById(decoded.id);

    if (!req.user || req.user.role !== "admin") {
        return next(
            new ErrorHandler(
                `${req.user?.role || "User"} not authorized to access this resource`,
                403
            )
        );
    }

    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const patientToken = req.cookies.patientToken;

    if (!patientToken) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const decoded = jwt.verify(patientToken, process.env.JWT_SECRETKEY);
    req.user = await User.findById(decoded.id);

    if (!req.user || req.user.role !== "patient") {
        return next(
            new ErrorHandler(
                `${req.user?.role || "User"} not authorized to access this resource`,
                403
            )
        );
    }

    next();
});
