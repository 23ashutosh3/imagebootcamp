

const mongoose = require("mongoose");



const instructorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
       required: true,
    },

    name: {
      type: String,
       required: true,
    },
   
  },
  {
    timestamps: true,
  }
);




const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
