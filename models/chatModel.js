const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        visionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vision",
        },
        messages:[
            {
              userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "User",
              },
              message:{
                type:String,
              },
              sendAt:{
                type:Date,
                default: new Date(),
              }
            }
        ]
    }
);

module.exports = mongoose.model("Chat", chatSchema);