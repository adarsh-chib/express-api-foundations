import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    phoneNumber : Number,
    role:{ type: String,
    enum: ['user', 'admin', 'manager'],
    default: 'user'},
})

export const User = mongoose.model("User", userSchema);



