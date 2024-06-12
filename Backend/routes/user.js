const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Send OTP Register
router.post("/", userController.registerUser);
router.put('/verify', userController.verifyUser) //path for getting all users
router.get('/users', userController.getAllUsers) //path for verifying the user

module.exports = router;