// external import
const express = require("express");

// internal imports
const { getLogin, login, logout } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidatorsHandler,
} = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();
const page_title = "Login";

// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidatorsHandler,
  login
);
router.delete("/", logout);

module.exports = router;
