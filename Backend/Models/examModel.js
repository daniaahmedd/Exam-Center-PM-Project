const mongoose = require('mongoose');

const examschema = new mongoose.Schema(
    {
        ExamName: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        ExamProvider: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        ExamFeesForeigners: {
            type: String,
            required: true,
        },
        ExamFeesLocals: {
            type: String,
            required: true,
        },
        ExamLocation: {
            type: String,
            required: true,
        },
        ExamTimes : [
            {
                ExamStartTime: {
                    type: Date,
                    required: true,
                    default: Date.now()
                },
                ExamEndTime: {
                    type: Date,
                    required: true,
                    default: Date.now()
            }
        }
        ],
        // ExamStartTime: {
        //     type: Date,
        //     required: true,
        //     default: Date.now()
        // },
        // ExamEndTime: {
        //     type: Date,
        //     required: true,
        //     default: Date.now()
        // },
        ExamSeats: {
            type: Number,
            required: true,
        },
        isAvailable:
        { 
            type: Boolean,
            required: true,
            default: true
        },
    },
    {
       
  
  
  
    }
);

module.exports = mongoose.model('exam', examschema);
module.exports.Schema = examschema;   
