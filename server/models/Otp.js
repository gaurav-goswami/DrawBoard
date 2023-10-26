const mongoose = require("mongoose");
const verificationMail = require("../utility/verificationMail");

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

otpSchema.pre("save", async function (next) {
    await verificationMail(this.email, this.otp);
    next();
})

const OTP = mongoose.model("otp", otpSchema);
module.exports = OTP;