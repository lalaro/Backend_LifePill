/**
 * Meal model
 * @param {number} id - Unique identifier for the meal
 * @param {string} name - Name of the meal
 * @param {string} description - Description of the meal
 * @param {number} calories - Caloric content of the meal
 * @param {number} proteins - Protein content of the meal
 * @param {number} carbohydrates - Carbohydrate content of the meal
 * @param {number} fats - Fat content of the meal
 * @param {string[]} ingredients - List of ingredients in the meal
 * @param {number} preparationTime - Preparation time in minutes
 */
class Meal {
    constructor(id, name, description, calories, proteins, carbohydrates, fats, ingredients, preparationTime) {
        this.name = name;
        this.description = description;
        this.calories = calories;
        this.proteins = proteins;
        this.carbohydrates = carbohydrates;
        this.fats = fats;
        this.ingredients = ingredients;
        this.preparationTime = preparationTime;
    }

}

module.exports = Meal;