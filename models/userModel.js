const mongoose = require("mongoose");
const Joi = require("joi");


let userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  date_created:{
    type:Date , default:Date.now()
  },
  role:{
    type:String, default:"user"
  }
})

exports.UserModel = mongoose.model("users",userSchema);

