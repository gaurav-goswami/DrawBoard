const express = require("express");
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRouter = require("./routes/Auth");

dotenv.config({
    path: "./.env"
})

const app = express();

app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

module.exports = app;