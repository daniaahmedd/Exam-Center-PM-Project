const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Book an exam
router.post("/bookExam", authorizationMiddleware(['User']), examController.bookExam);

module.exports = router;