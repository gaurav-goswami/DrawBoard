const ErrorHandler = require("../utility/ErrorHandler");
const { verifyToken } = require("../utility/jwtHelper");

const isAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.headers['Authorization'].split(' ')[1] || req.headers['authorization'].split(' ')[1];

        if (!token) return next(new ErrorHandler("Auth token not found.", 404));
        const payload = await verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        console.log("Auth token is invalid", error.message);
        return next(new ErrorHandler("Auth token is invalid or expired"));
    }
}

module.exports = isAuth;