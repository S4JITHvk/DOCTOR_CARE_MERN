const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    addresses: [{
        houseName: {
            type: String,
            required: true
        },
        postOffice: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);