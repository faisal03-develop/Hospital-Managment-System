export const generateeToken = async (user, message, statusCode, res) => {
    const token = await user.generateToken();
    const cookieName = user.role === "admin" ? "adminToken" : "userToken";
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