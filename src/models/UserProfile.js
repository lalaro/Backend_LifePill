// src/models/UserProfile.js
const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  preferences: { type: Object, default: {} },  
  dietaryRestrictions: { type: [String], default: [] }, 
  allergies: { type: [String], default: [] },
  fitnessLevel: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  targetWeight: { type: Number, default: 0 }
}, { timestamps: true });

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
