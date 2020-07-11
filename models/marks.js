

const mongoose = require("mongoose");



const marksSchema = new mongoose.Schema(
    {
      

        marks: {
            type: Number,
            enum: [1,2,3,4,5],
                
                
            required:true
        },

    },
    {
        timestamps: true,
    }
);




const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
