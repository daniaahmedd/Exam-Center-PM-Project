const examModel = require("../Models/examModel");
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

        console.log(existingExam)

        return res.status(200).send("Exam added successfully");
    },
    
    
}

module.exports = examController;
