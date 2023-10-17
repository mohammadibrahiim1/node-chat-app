const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/userModel");
const { unlink } = require("fs");



// get users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

// add user
const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
      // data: result,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: "Unknown error occured!",
        },
      },
    });
  }
};
module.exports = { getUsers, addUser };
