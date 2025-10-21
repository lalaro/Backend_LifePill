// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },           
  email: { type: String, required: true, unique: true }, 
  passwordHash: { type: String, required: false },   // ✅ no obligatorio
  role: { type: String, default: "user" },
  profile: { type: Object, default: null },
  phoneNumber: { type: String, default: null },
  healthStats: { type: [Object], default: [] },
  notifications: { type: [Object], default: [] },

  // 🔽 nuevos campos útiles
  picture: { type: String, default: null },
  provider: { type: String, default: "local" } // puede ser "local" o "google"
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
