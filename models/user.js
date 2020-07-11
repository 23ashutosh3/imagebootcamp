//user schema ,user can register 

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    bootcamp: {
      type: String,
      enum: [
        "Begginer",
        "Intermediate",
        "Advance",
        
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Customer", userSchema);

module.exports = User;
