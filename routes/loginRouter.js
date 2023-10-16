// external import
const express = require("express");

// internal imports
const {} = require("../controllers/loginController");

const router = express.Router();

// login page
router.get("/", loginController);

module.exports = router;
