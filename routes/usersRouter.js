// external import
const express = require("express");
// const { check } = require("express-validator");

// internal imports
const { getUsers, addUser } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

// get user
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
router.post(
  "/users",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser,
  (req, res) => {
    req.flash("success", "User has been successfully added!");
    res.redirect("/");
  }
);

module.exports = router;
