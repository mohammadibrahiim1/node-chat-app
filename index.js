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

const user = require("./models/userModel");

app.use("/", userRoute);

const io = require("socket.io")(http);

var usp = io.of("/user-namespace");

usp.on("connection", async function (socket) {
  console.log("user connected");

  const userId = socket.handshake.auth.token;

  await user.findByIdAndUpdate(
    {
      _id: userId,
    },
    {
      $set: { is_online: "1" },
    }
  );

  // user broadcast online status
  socket.broadcast.emit("getOnlineUser", {
    user_id: userId,
  });

  console.log(userId);

  socket.on("disconnect", async function () {
    const userId = socket.handshake.auth.token;
    console.log("user disconnected");

    await user.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: { is_online: "0" },
      }
    );

    //* user broadcast offline status
    socket.broadcast.emit("getOfflineUser", {
      user_id: userId,
    });

    console.log(userId);
  });
});

http.listen(5000, function () {
  console.log("chat-app server is running");
});
