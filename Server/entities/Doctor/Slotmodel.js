const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  availableTimeFrom: {
    type: String,
    required: true,
  },
  availableTimeTo: {
    type: String,
    required: true,
  },
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;

