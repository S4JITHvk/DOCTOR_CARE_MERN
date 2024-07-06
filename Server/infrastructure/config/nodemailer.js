const nodemailer = require('nodemailer');
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});
const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions).then(() => {
        console.log('Email sent successfully. Message ID:');
    }).catch((error) => {
        console.error('Error sending email:', error);
        throw new Error('Error sending email')
    });
}
module.exports =  sendMail