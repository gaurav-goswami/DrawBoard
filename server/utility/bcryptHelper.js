const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
    try {
        const SALT = await bcrypt.genSalt(Number(process.env.GEN_SALT));
        const hashedPassword = await bcrypt.hash(password, SALT);
        return hashedPassword;
    } catch (error) {
        console.log('Error while hashing password' , error);
    }
}

exports.comparePassword = async (password, hashedPassword) => {
    try {
        const comparePassword = await bcrypt.compare(password, hashedPassword);
        if(comparePassword) return true;
        return false;
    } catch (error) {
        console.log('Error while ')
    }
}