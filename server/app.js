const express = require("express");
const dotenv = require("dotenv");

dotenv.config({
    path : "./.env"
})

const app = express();

module.exports = app;