
const Meal = require("../models/Meal");


const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).send("Meal not found");
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMeal = async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMeal) return res.status(404).json({ message: "Meal not found" });
    res.json(updatedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const deleted = await Meal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Meal not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMeals, getMealById, createMeal, updateMeal, deleteMeal };
