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


const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const Trainee = require('../models/trainee');

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
    const { examId, newDate, reason } = req.body;

    // Validate reason
    if (!acceptableReasons.includes(reason)) {
      return res.status(400).json({ message: 'Invalid rescheduling reason' });
    }

    // Calculate rescheduling fee
    const fee = rescheduleFees[reason];

    // Find the exam
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Update exam with rescheduling details
    exam.examDate = newDate;
    exam.rescheduled = true;
    exam.rescheduleReason = reason;
    exam.rescheduleFee = fee;

    // Save the updated exam
    await exam.save();

    res.status(200).json({ message: 'Exam rescheduled successfully', fee });
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling exam', error });
  }







  
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
  







});

module.exports = router;

const express = require("express");

const examController = require("../controllers/examController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');


router.post("/examprovider", examController.addProvider);


router.post("/new/examcenter", examController.addNewExam);

// Get all exams
router.post("/getExams", examController.getExams);


router.post("/book-exam", authorizationMiddleware, examController.bookExam);


router.get("/trainee-bookings", authorizationMiddleware, examController.getTraineeBookings);

module.exports = router;





module.exports = router;