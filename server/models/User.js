const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utility/bcryptHelper");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    password: {
        type: String,
        required: true,
        select : false
    }
})

userSchema.pre("save" , async function (next) {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;