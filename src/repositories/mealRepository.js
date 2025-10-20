
const Meal = require("../models/Meal");

class MealRepository {
  async listar() {
    return Meal.find();
  }

  async obtenerPorId(id) {
    return Meal.findById(id);
  }

  async crear(data) {
    const meal = new Meal(data);
    return meal.save();
  }

  async actualizar(id, data) {
    return Meal.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return Meal.findByIdAndDelete(id);
  }
}

module.exports = new MealRepository();
