export const generateeToken = async (user, message, statusCode, res) => {
    const token = await user.generateToken();
    let cookieName;
    if(user.role === "admin"){
        cookieName = "adminToken";
    }else if(user.role === "doctor"){
        cookieName = "doctorToken";
    }else{
        cookieName = "patientToken";
    };
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + 30 * 60 * 1000),  //30 Minutes
        httpOnly: true,
        sameSite: "none",
        secure: true,
    }).json({
        success: true,
        message,
        token,
        user,
    });
}