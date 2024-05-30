const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', 
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  shift: {
    type: String, 
    required: true
  },
   status: {
    type: String,
    default: 'Active' 
  },
   payment: {
    type: String, 
    required: true,
    default: 'pending' 
  }
},{ timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
