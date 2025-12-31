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
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
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