// external imports
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// import router
const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/usersRouter");
const inboxRouter = require("./routes/inboxRouter");

// internal imports

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// const { getLogin } = require("./controllers/loginController");

const app = express();

// mongoose.connect(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/chat-app?retryWrites=true&w=majority`
// );

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/chat-app?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connection successful!"))
  .catch((error) => console.log(error));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "publics")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found  handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// const http = require("http").Server(app);

// const userRoute = require("./routes/userRoute");

// const user = require("./models/userModel");
// // const cookieParser = require("cookie-parser");

// app.use("/", userRoute);

// const io = require("socket.io")(http);

// var usp = io.of("/user-namespace");

// usp.on("connection", async function (socket) {
//   console.log("user connected");

//   const userId = socket.handshake.auth.token;

//   await user.findByIdAndUpdate(
//     {
//       _id: userId,
//     },
//     {
//       $set: { is_online: "1" },
//     }
//   );

//   // user broadcast online status
//   socket.broadcast.emit("getOnlineUser", {
//     user_id: userId,
//   });

//   console.log(userId);

//   socket.on("disconnect", async function () {
//     const userId = socket.handshake.auth.token;
//     console.log("user disconnected");

//     await user.findByIdAndUpdate(
//       {
//         _id: userId,
//       },
//       {
//         $set: { is_online: "0" },
//       }
//     );

//     //* user broadcast offline status
//     socket.broadcast.emit("getOfflineUser", {
//       user_id: userId,
//     });

//     console.log(userId);
//   });

//   // chatting implementation
//   socket.on("newChat", function (data) {
//     socket.broadcast.emit("loadNewChat", data);
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`CHAT-APP LISTENING TO PORT ${process.env.PORT}`);
});
