require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

function smsService(recipients, message) {
    client.messages
    .create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: recipients
    })
    .then(message => console.log(message.sid));
}

module.exports = {smsService};
