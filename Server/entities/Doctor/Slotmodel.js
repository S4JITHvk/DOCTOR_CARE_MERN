const mongoose = require('mongoose');
const { Schema } = mongoose;
const slotSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shifts: [
    {
      type: String,
      enum: ["9am-10am", "10am-11am","11am-12pm", "2pm-3pm", "3pm-4pm", "4pm-5pm","5pm-6pm"],
      required: true,
    },
  ],
});
const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;