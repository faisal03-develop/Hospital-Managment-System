import { catchAsyncErrors } from "./catchAsyncError";
import * as jwt from 'jsonwebtoken';

export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {adminToken} = req.cookies;
    if(!adminToken){
        return next(new ErrorHandler("Admin Not Authenticated", 400));
    }
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRETKEY);
    req.user = await User.findById(decoded.id);
    next();
})