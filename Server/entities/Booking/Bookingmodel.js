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
    chargeId: {
      type: String,
      default: null
    },
    paymentId: {
      type: String,
      default: null
    },
    amount: {
      type: Number,
      default: null
    },
    status:{
      type:String,
      default:"Paid"
    }
  }
}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
