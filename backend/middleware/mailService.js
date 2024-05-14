require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS
    }
})
async function mailService(sender, recipient, subject, text, html) {
    const mailOptions = {
        from: sender,
        to: recipient,
        subject: subject,
        text: text,
        html: html
      }
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err.message);
      } else {
        console.log('Email sent successfully');
        }
    });
}

module.exports = {mailService};