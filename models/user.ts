import mongoose, { Schema, model } from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
const User = model("User", userSchema);

export default User;