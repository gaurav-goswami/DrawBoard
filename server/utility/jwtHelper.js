const jwt = require("jsonwebtoken");

exports.generateToken = (userId, email) => {
    return new Promise((resolve, reject) => {
        const payload = { userId, email };
        const option = {expiresIn : "20d"};
        jwt.sign(payload, option, process.env.JWT_SECRET, function (error, token) {
            if(error) return reject(error);
            return resolve(token);
        })
    })
}

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET , function (error, payload) {
            if(error) return reject(error);
            return resolve(payload);
        })
    })
}