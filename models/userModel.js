const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: Number,
    required: true,
  },
    profile: {
      type: String,
    },
  password: {
    type: String,
    required: true,
  },
  bio:{
    type:String,
  },
  notifications:[
    {
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      visionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vision",
      },
      isRead:{
        type:Boolean,
        default: false
      },
    }
  ]
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
