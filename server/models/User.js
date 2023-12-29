const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    bio: String,
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
