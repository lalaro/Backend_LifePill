const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },           
  email: { type: String, required: true, unique: true }, 
  passwordHash: { type: String, required: true },   
  role: { type: String, default: "user" },          
  profile: { type: Object, default: null },         
  healthStats: { type: [Object], default: [] },     
  notifications: { type: [Object], default: [] }    
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;