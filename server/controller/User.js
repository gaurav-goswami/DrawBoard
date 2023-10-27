const User = require("../models/User");
const generateOtp = require("../utility/generateOtp");
const Otp = require("../models/Otp");
const { hashPassword, comparePassword } = require("../utility/bcryptHelper");
const { generateToken } = require("../utility/jwtHelper");
const ErrorHandler = require("../utility/ErrorHandler");

exports.sendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return next(new ErrorHandler("Email ID is required to send OTP", 404));
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 401));

        let newOtp = generateOtp();
        let isOtpPresent = await Otp.findOne({ otp: newOtp });
        while (isOtpPresent) {
            newOtp = generateOtp();
            isOtpPresent = await Otp.findOne({ otp: newOtp });
        }
        await Otp.create({ otp: newOtp, email });
        return res.status(200).json({
            success: true,
            message: "Otp sent to your email ID"
        })
    } catch (error) {
        console.log("Error in send otp handler");
        return next(new ErrorHandler("Internal server error", 500))
    }
}

exports.signUpUser = async (req, res, next) => {
    try {

        const { username, email, password, otp } = req.body;
        if (!username || !email || !password || !otp) return next(new ErrorHandler("All fields are required", 401));

        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exits please login", 401));
        const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) return next(new ErrorHandler("OTP not found", 404));
        else if (otp !== recentOtp.otp) return next(new ErrorHandler("OTP did not match", 400));

        let hashedPassword = await hashPassword(password, next);
        user = await User.create({ username, email, password: hashedPassword });

        const token = await generateToken(user._id, user.email);
        res.cookie("token", token, {
            expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "Signup successfully"
        })

    } catch (error) {
        console.log(error.message);
        return next(new ErrorHandler("Internal server error", 500));
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new ErrorHandler("Email and password are required", 401));

        let user = await User.findOne({ email });
        if (!user) return next(new ErrorHandler("No account associated with this email. Please signup", 404));

        let isMatch = await comparePassword(password, user.password);
        if (user && isMatch) {
            const token = await generateToken(user._id, user.email);
            res.cookie("token", token, {
                expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                httpOnly: true
            })
        } else {
            return next(new ErrorHandler("Invalid credentials", 401));
        }

    } catch (error) {
        console.log("error in login", error);
        return next(new ErrorHandler("Internal server error", 500));
    }
}

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: "Logged out"
        })
    } catch (error) {
        console.log("Error in logout");
        return next(new ErrorHandler("Internal server error", 500));
    }
}