const cron = require('node-cron');
const mongoose = require('mongoose');
const Booking = require('../entities/Booking/Bookingmodel');
const User = require('../entities/User/usermodel');
const sendEmail = require('../infrastructure/config/nodemailer');

// Function to send email
const sendingEmail = (userEmail, booking) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: 'Appointment Reminder',
    text: `Dear User,\n\nThis is a reminder for your appointment scheduled on ${booking.date} during the ${booking.shift} shift.\n\nYou can access more details and manage your appointment on our website:\n\nhttps://mindcareorg.online\n\nThank you.`,
    html: `Dear User,<br><br>This is a reminder for your appointment scheduled on ${booking.date} during the ${booking.shift} shift.<br><br>You can access more details and manage your appointment on our website:<br><br><a href="https://mindcareorg.online">MindCare</a><br><br>Thank you.`
  };
  sendEmail(mailOptions);
};

const getShiftStartTime = (date, shift) => {
  const [start] = shift.split('-');
  const [hour, period] = start.match(/(\d+)(am|pm)/).slice(1, 3);
  const shiftHour = period === 'pm' && hour !== '12' ? parseInt(hour) + 12 : parseInt(hour);
  const shiftDateTime = new Date(date);
  shiftDateTime.setHours(shiftHour, 0, 0, 0);
  return shiftDateTime;
};


const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Cron job started at:', new Date());
    try {
      const currentDate = new Date();
      const nextDay = new Date(new Date(currentDate.toDateString()).setDate(currentDate.getDate() + 1));
      const bookings = await Booking.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(currentDate.toDateString()),
              $lt: nextDay
            },
            status: 'Active',
            reminderSent: false
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        {
          $unwind: '$userDetails'
        },
        {
          $project: {
            userEmail: '$userDetails.email',
            userName: '$userDetails.name',
            date: 1,
            shift: 1
          }
        }
      ]);
      console.log(bookings,"==>")
      bookings.forEach(async (booking) => {
        const shiftStartTime = getShiftStartTime(booking.date, booking.shift);
        const oneHourBeforeShift = new Date(shiftStartTime.getTime() - 60 * 60 * 1000);
        if (currentDate >= oneHourBeforeShift && currentDate < shiftStartTime) {
          console.log(`Sending email to: ${booking.userEmail} for booking ID: ${booking._id}`);
          sendingEmail(booking.userEmail, booking);
          // Mark the booking as reminded
          await Booking.updateOne({ _id: booking._id }, { $set: { reminderSent: true } });
        }
      });
    } catch (error) {
      console.log(`Error fetching bookings: ${error}`);
    }
  });
};

module.exports = startCronJob;
