const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Add new exam provider
router.post("/examprovider", examController.addProvider);

// * Add new exam (held by exam center)
router.post("/new/examcenter", examController.addNewExam);

// * Get all exams
router.post("/getExams", examController.getExams);

// * Get exam by id
router.post("/getExam", examController.getExam);

// * Book an exam
router.post("/bookExam", examController.bookExam);

module.exports = router;