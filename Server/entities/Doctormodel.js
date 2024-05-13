const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
  experience_years: {
    type: Number,
    required: true
  },
  working_Hospital: {
    type: String,
    required: true
  },
  working_Hospital_contact: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  medical_license_no: {
    type: String,
    required: true,
    unique: true
  },
  is_banned: {
    type: Boolean,
    required: true,
    default: false
},
is_verified:{
    type:Boolean,
    required:true,
    default:false
},
role: {
    type: String,
    default: "DOCTOR"
}
},{ timestamps: true });
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
