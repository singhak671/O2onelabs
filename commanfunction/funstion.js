var accountSid = 'AC1d646c0847ec01deb629a81e4c1ac4fc'; // Your Account SID from www.twilio.com/console
var authToken = 'ac6a7492f2e3d8104be1e3e1f440e61c';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');

module.exports = {

    getOTP: () => {
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log("otp==>>", val);
        return val;

    },
    sendOTP: (message, number, callback) => {
        let client = new twilio(accountSid, authToken);
        client.messages.create({
            body: message,
            to: number, // Text this number
            from: '+17076002861' // From a valid Twilio number
        })
            .then((message) => {
                callback(null, message.sid);
            })
            .catch((response) => {
                callback(response);
            })
    }
}