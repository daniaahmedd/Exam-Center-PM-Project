const mongoose = require('mongoose');

const examBookingschema = new mongoose.Schema(
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
        UserName: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        UserEmail: {
            type: String,
            required: true,
        },
        ExamStartTime: {
            type: Date,
            required: true,
            default: Date.now()
        },
        ExamEndTime: {
            type: Date,
            required: true,
            default: Date.now()
        },
        ExamId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'examModel'
        },
    },
    {
        strict: true,
        timestamps: true,
    }
);

module.exports = mongoose.model('examBooking', examBookingschema);
module.exports.Schema = examBookingschema;   
