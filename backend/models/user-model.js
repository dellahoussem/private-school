const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
    specialty: { type: String },
    childPhone: { type: String },
    cv: { type: String },
    photo: { type: String }
});

const user = mongoose.model("User",userSchema);
module.exports = user;