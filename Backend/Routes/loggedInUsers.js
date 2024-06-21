const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Book an exam
router.post("/bookExam", authorizationMiddleware(['User']), examController.bookExam);

router.post("/examprovider", examController.addProvider);


router.post("/new/examcenter", examController.addNewExam);

// Get all exams
router.post("/getExams", examController.getExams);


router.post("/book-exam", authorizationMiddleware, examController.bookExam);

// router.get("/trainee-bookings", authorizationMiddleware, examController.getTraineeBookings);

module.exports = router;