const mongoose = require('mongoose');

const userschema = new mongoose.Schema(
    {
        UserName: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        userType: {
            type: String,
            enum:[ "Admin", "User", "ExamProvider"],
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        firstName: 
        { type: String,
          required: true 
        },
        lastName:
         { type: String,
           required: true },
    },
    {
        strict: true,
        timestamps: true,
    }
);

module.exports = mongoose.model('user', userschema);
module.exports.Schema = userschema;   
