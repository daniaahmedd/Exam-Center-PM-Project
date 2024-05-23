const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Send OTP Register
router.post("/",  authorizationMiddleware(['Admin']), userController.registerUser);

module.exports = router;