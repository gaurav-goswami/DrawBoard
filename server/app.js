const express = require("express");
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config({
    path : "./.env"
})

const app = express();

app.use(errorMiddleware);

module.exports = app;