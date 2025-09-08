let meals = [];

const getMeals = (req, res) => {
    res.json(meals);
}

const getMealById = (req, res) => {
    const meal = meals.find(m => m.id === parseInt(req.params.id));
    if (!meal) return res.status(404).send('Meal not found');
    res.json(meal);
}

const createMeal = (req, res) => {
    const newMeal = req.body;
    meals.push(newMeal);
    res.status(201).json(newMeal);
}

const updateMeal = (req, res) => {
    const index = meals.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Meal not found' });
    meals[index] = { ...meals[index], ...req.body };
    res.json(meals[index]);
}

const deleteMeal = (req, res) => {
    const index = meals.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Meal not found' });
    const deleted = meals.splice(index, 1);
    res.json(deleted[0]);
}
module.exports = { getMeals, getMealById, createMeal, updateMeal, deleteMeal };