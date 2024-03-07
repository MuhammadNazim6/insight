const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Reference to User model
  },
  fullname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  houseName:{
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
});


const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type: Object,
  }
  
});
