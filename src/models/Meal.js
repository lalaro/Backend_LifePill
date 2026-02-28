
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String, default: "" },
  calories: { type: Number, required: true },
  proteins: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fats: { type: Number, required: true },
  ingredients: { type: [String], default: [] },
  preparationTime: { type: Number, required: true }
}, { timestamps: true });

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
