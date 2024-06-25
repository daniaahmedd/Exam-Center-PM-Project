const examModel = require("../Models/examModel");
const userModel = require("../Models/userModel");
const sessionModel = require("../Models/sessionModel");
const examBookingModel = require("../Models/examBookingModel");
const examProviderModel = require("../Models/examProviderModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY ;
const bcrypt = require("bcrypt");
const speakeasy = require('speakeasy');
const Cookies = require('js-cookie');

const examController = {
    addProvider: async (req, res) => {
            const { providerName, examName} = req.body;

            const existingProvider = await examModel.findOne({ ExamProviderName: providerName });

            if (existingProvider) {
                return res.status(409).send("Provider already exists");
            }
            
            const newProvider = new examProviderModel({
                ExamProviderName: providerName,
                ExamNameProvided: examName
            });

            await newProvider.save();

            return res.status(200).send("Exam provider registered successfully");
    },
    addNewExam: async (req, res) => {
        const { examName, examprovider, foreignerfees, localfees, location, starttime, endtime, examseats } = req.body;

        const existingExam = await examModel.findOne({ ExamName: examName });

        if (existingExam) {
            return res.status(409).send("Exam already exists");
        }

        const existingProvider = await examProviderModel.findOne({ ExamProviderName: examprovider });

        if (!existingProvider) {
            return res.status(409).send("This provider doesn't exist");
        }

        function parseDateString(dateString) {
            const [date, time] = dateString.split(' ');
            const [day, month, year] = date.split('/').map(Number);
            const [hours, minutes, seconds] = time.split(':').map(Number);
            return new Date(year, month - 1, day, hours, minutes, seconds);
        }

        const examStartTime = parseDateString(starttime);
        const examEndTime = parseDateString(endtime);
        
        const newExam = new examModel({
            ExamName: examName,
            ExamProvider: examprovider,
            ExamFeesForeigners: foreignerfees,
            ExamFeesLocals: localfees,
            ExamLocation: location,
            ExamStartTime: examStartTime,
            ExamEndTime: examEndTime,
            ExamSeats: examseats
        });

        await newExam.save();

        return res.status(200).send("Exam added successfully");
        
    },
    getExams: async (req, res) => {
        const existingExam = await examModel.find();

        return res.status(200).json(existingExam);
    },
    getExam: async (req, res) => {
        const examid = req.body.examId;
        const existingExam = await examModel.findById(examid);

        return res.status(200).json(existingExam);
    },
    bookExam: async (req, res) => {
        const { examId } = req.body;

        // mesh hayshta8al delwa2ty 3ashan login mkhlstsh fa b-hardcode any user
        // const reqCookie = req.headers.cookie;
        // const searchTerm = 'token=';
        // const searchIndex = reqCookie.indexOf(searchTerm);
        // const reqToken = reqCookie.substr(searchIndex + searchTerm.length);

        // const userSession = await sessionModel.find({token: reqToken},{"userId":1,"_id":0});

        const existingExam = await examModel.findOne({ _id: examId });
        // const loggedInUser = await userModel.findOne({ _id: userSession[0].userId });

        const loggedInUser = await userModel.findOne({ _id: "6669d712b410efe108fe6771" });
        if (!existingExam) {
            return res.status(409).send("Exam doesn't exist");
        }

        // Check if the user has booked the same exam within the last 2 weeks
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        console.log('here => ', existingExam);
        const existingBooking = await examBookingModel.findOne({ 
            UserEmail: loggedInUser.email,
            ExamName: existingExam.ExamName,
            createdAt: { $gte: twoWeeksAgo }
        });

        if (existingBooking) {
            console.log('here')
            return res.status(409).send("You have already booked this exam within the last 2 weeks");
        }
        console.log('exam seat =>',existingExam.ExamSeats);
        if (existingExam.ExamSeats <= 0) {
            return res.status(400).send("No seats available");
        }

        existingExam.ExamSeats -= 1;

        await existingExam.save();

        const newBooking = new examBookingModel({
            UserEmail: loggedInUser.email,
            UserName: loggedInUser.UserName,
            ExamName: existingExam.ExamName,
            ExamProvider: existingExam.ExamProvider,
            ExamStartTime: existingExam.ExamStartTime,
            ExamEndTime: existingExam.ExamEndTime,
            ExamId: examId,
        });

        await newBooking.save();

        return res.status(200).send("Exam booked successfully");
    },
    checkAvailableSeats: async (req, res) => {
        const { examName } = req.params;

        const exam = await examModel.findOne({ ExamName: examName });

        if (!exam) {
            return res.status(404).send("Exam not found");
        }

        return res.status(200).json({ availableSeats: exam.ExamSeats });
    },
    getUserBooking: async (req, res) => {
        const { username } = req.params;

        const exam = await examBookingModel.find({ UserName: username });

        if (!exam) {
            return res.status(404).send("Exam not found");
        }

        return res.status(200).json({ exam: exam });
    },
    getExamByName: async (req, res) => {
        const examname = req.body.examName;
        const existingExam = await examModel.find({ExamName: examname});

        return res.status(200).json(existingExam);
    },

}





const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());


// app.post("/api/exams/book", examController.bookExam);
// app.get("/api/exams/bookings/:traineeId", examController.getTraineeBookings);



module.exports = examController;
