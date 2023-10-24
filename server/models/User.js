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
    },
    password: {
        type: String,
        required: true,
        select : false
    }
})

userSchema.pre("save" , async function () {
    const hashedPassword = await hashPassword(this.password);
    console.log("before save" , hashedPassword);
    this.password = hashedPassword;
})

const User = mongoose.model('user', userSchema);
module.exports = User;