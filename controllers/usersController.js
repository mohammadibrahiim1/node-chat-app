const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/userModel");
const { unlink } = require("fs");

// get users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
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

// remove user
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,

      // remove user avatar if any
    });
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../publics/uploads/avatars/${user.avatar}`),
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: "Could not delete the user",
        },
      },
    });
  }
};
module.exports = { getUsers, addUser, removeUser };
