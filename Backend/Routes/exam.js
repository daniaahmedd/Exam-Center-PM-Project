const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')
const examBookingModel = require("../Models/examBookingModel");

// * Add new exam provider
router.post("/examprovider", examController.addProvider);

// * Add new exam (held by exam center)
router.post("/new/examcenter", examController.addNewExam);

// * Get all exams
router.post("/getExams", examController.getExams);


// * Get exam by id
router.post("/getExam", examController.getExam);

// * Get exam by name
router.post("/getExamByName", examController.getExamByName);

// * Book an exam
router.post("/bookExam", examController.bookExam);

// * Book an exam
router.post("/getUserBooking/:username", examController.getUserBooking);

router.get('/exam/:examName/seats', examController.checkAvailableSeats);


const Exam = require('../Models/examModel');
const Trainee = require('../Models/trainee');

// Define acceptable reasons for rescheduling
const acceptableReasons = ['Medical Emergency', 'Family Emergency', 'Work Conflict', 'Other'];

const rescheduleFees = {
  'Medical Emergency': 0,
  'Family Emergency': 20,
  'Work Conflict': 50,
  'Other': 100
};

// POST endpoint to reschedule an exam
router.post('/reschedule', async (req, res) => {
  try {
    const { examId } = req.body; // Use req.body to get examId
    const { newDate, reason } = req.body;

    // Validate reason
    if (!acceptableReasons.includes(reason)) {
      return res.status(400).json({ message: 'Invalid rescheduling reason' });
    }

    // Calculate rescheduling fee
    const fee = rescheduleFees[reason];

    // Find the exam booking
    const exam = await examBookingModel.findOne({ ExamId: examId }); // Use findOne instead of find
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Calculate the difference between ExamStartTime and ExamEndTime
    const startTime = new Date(exam.ExamStartTime);
    const endTime = new Date(exam.ExamEndTime);
    const timeDifference = endTime - startTime;

    // Update exam with rescheduling details
    exam.ExamStartTime = new Date(newDate);
    exam.ExamEndTime = new Date(new Date(newDate).getTime() + timeDifference); // Maintain the time difference
    exam.rescheduled = true;
    exam.rescheduleReason = reason;
    exam.rescheduleFee = fee;

    // Save the updated exam
    await exam.save();

    res.status(200).json({ message: 'Exam rescheduled successfully', fee });
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling exam', error });
  }
});


  // POST endpoint to create a new trainee
  router.post('/', async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, dateOfBirth, nationality, identityDocument, passport, personalPhoto } = req.body;
  
      // Validate nationality-specific fields
      if (nationality === 'Egyptian' && !identityDocument) {
        return res.status(400).json({ message: 'Identity document is required for Egyptian trainees' });
      }
  
      if (nationality !== 'Egyptian' && !passport) {
        return res.status(400).json({ message: 'Passport is required for foreign trainees' });
      }
  
      if (!personalPhoto) {
        return res.status(400).json({ message: 'Personal photo is required' });
      }
  
      // Check if trainee already exists
      const existingTrainee = await Trainee.findOne({ email });
      if (existingTrainee) {
        return res.status(400).json({ message: 'Trainee information already exists' });
      }
  
      // Create a new trainee instance
      const trainee = new Trainee({
        firstName,
        lastName,
        email,
        phone,
        address,
        dateOfBirth,
        nationality,
        identityDocument,
        passport,
        personalPhoto
      });
  
      // Save the trainee to the database
      await trainee.save();
  
      res.status(201).json({ message: 'Trainee information saved successfully', trainee });
    } catch (error) {
      res.status(400).json({ message: 'Error saving trainee information', error });
    }
  });
  
  module.exports = router;
  








module.exports = router;

router.post("/examprovider", examController.addProvider);


router.post("/new/examcenter", examController.addNewExam);

// Get all exams
router.post("/getExams", examController.getExams);


// router.post("/book-exam", authorizationMiddleware, examController.bookExam);


// router.get("/trainee-bookings", authorizationMiddleware, examController.getTraineeBookings);

module.exports = router;