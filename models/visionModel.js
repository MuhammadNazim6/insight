const mongoose = require("mongoose");

const visionSchema = new mongoose.Schema({
  vision: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      upvotes: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        },
      ],
      interested:[
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        }
      ],
      comments:[
        {
          userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment:{
            type:String,
          },
          
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt:{
        type: Date,
      }
    },

  ],
});

const Vision = mongoose.model("Vision", visionSchema);

module.exports = Vision;


// notification 