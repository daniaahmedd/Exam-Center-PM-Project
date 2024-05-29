const mongoose = require('mongoose');

const examProviderschema = new mongoose.Schema(
    {
        ExamProviderName: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        ExamNameProvided: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
    },
    {
        strict: true,
        timestamps: true,
    }
);

module.exports = mongoose.model('examProviders', examProviderschema);
module.exports.Schema = examProviderschema;   
