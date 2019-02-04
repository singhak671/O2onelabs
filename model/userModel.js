var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userData = new Schema({
    fullname: {
        type: String
    },
    countryCode: { 
        type: String
    },
    mobile_no: {
        type: String
    },
    no_of_user: {
        type: String
    },
    otp: {
        type: String
    }
}, {
        timestamps: true
    })

module.exports = mongoose.model('user', userData, 'user');