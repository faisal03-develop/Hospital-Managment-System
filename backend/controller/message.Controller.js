
import {Message} from "../models/messege.Model.js"
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

export const sendMesssage = catchAsyncErrors(async(req, res, next) => {
    
    const {firstName, lastName, email, phone, message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

        await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    next()
})