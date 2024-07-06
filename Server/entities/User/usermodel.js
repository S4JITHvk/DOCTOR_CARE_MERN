const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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
    is_Deleted:{
        type:Boolean,
        required:true,
        default:false
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    favoriteDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    profile: {
        type: String,
      },
}, { timestamps: true });

// Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("User", userSchema);