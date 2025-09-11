 const mealRepository = require("../repositories/mealRepository");

exports.getMeals = async (req, res) => {
  try {
    const meals = await mealRepository.listar();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMealById = async (req, res) => {
  try {
    const meal = await mealRepository.obtenerPorId(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createMeal = async (req, res) => {
  try {
    const newMeal = await mealRepository.crear(req.body);
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const updatedMeal = await mealRepository.actualizar(req.params.id, req.body);
    if (!updatedMeal) return res.status(404).json({ message: "Meal not found" });
    res.json(updatedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await mealRepository.eliminar(req.params.id);
    if (!deletedMeal) return res.status(404).json({ message: "Meal not found" });
    res.json(deletedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
