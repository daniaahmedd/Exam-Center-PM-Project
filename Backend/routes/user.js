const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Send OTP Register
router.post("/", userController.registerUser);

module.exports = router;