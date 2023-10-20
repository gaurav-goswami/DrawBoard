const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connected = await mongoose.connect(process.env.DB_URI);
        if(connected) console.log("Successfully connected to database");
    } catch (error) {
        console.log('Cannot connect to database', error.message);
        process.exit(1);
    }
}

module.exports = connectDb;