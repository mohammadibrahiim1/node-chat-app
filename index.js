require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/chat-app?retryWrites=true&w=majority`
);

const app = express();

app.use(cors());
// app.use(express.json());

const http = require("http").Server(app);

const userRoute = require("./routes/userRoute");

app.use("/", userRoute);

http.listen(5000, function () {
  console.log("chat-app server is running");
});
