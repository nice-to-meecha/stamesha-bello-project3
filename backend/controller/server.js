require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const busboy = require("connect-busboy");
const users = require("./user");
const statusUpdates = require("./statusUpdate");
const images = require("./image");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(busboy());

app.use("/api/users/", users);
app.use("/api/statusUpdates/", statusUpdates);
app.use("/api/images", images);

mongoose.connect(process.env.MONGO_DB_ENDPOINT);

app.listen(process.env.port || 8000, () => {
    console.log("Starting project3 server!");
});