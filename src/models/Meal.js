
const mongoose = require("mongoose");

/**
 * Meal Schema
 * @param {String} name - Name of the meal
 * @param {String} description - Description of the meal
 * @param {Number} calories - Total calories in the meal
 * @param {Number} proteins - Protein content in grams
 * @param {Number} carbohydrates - Carbohydrate content in grams
 * @param {Number} fats - Fat content in grams
 * @param {Array} ingredients - List of ingredients
 * @param {Number} preparationTime - Preparation time in minutes
 */
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
