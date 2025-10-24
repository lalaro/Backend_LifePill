const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Meal = require("../src/models/Meal");

let mongoServer;

describe("Meal Model", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }, 20000); // aumentamos timeout

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("debería crear una comida válida correctamente", async () => {
    const mealData = {
      name: "Ensalada de pollo",
      description: "Una comida ligera y saludable",
      calories: 350,
      proteins: 30,
      carbohydrates: 20,
      fats: 10,
      ingredients: ["pollo", "lechuga", "tomate"],
      preparationTime: 15,
    };

    const meal = new Meal(mealData);
    const savedMeal = await meal.save();

    expect(savedMeal._id).toBeDefined();
    expect(savedMeal.name).toBe(mealData.name);
    expect(savedMeal.ingredients).toContain("pollo");
  });

  test("debería fallar si faltan campos requeridos", async () => {
    const meal = new Meal({ description: "Faltan los campos obligatorios" });

    let error;
    try {
      await meal.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.calories).toBeDefined();
  });

  test("debería asignar valores por defecto correctamente", async () => {
    const mealData = {
      name: "Batido de proteínas",
      calories: 250,
      proteins: 20,
      carbohydrates: 15,
      fats: 5,
      preparationTime: 5,
    };

    const meal = new Meal(mealData);
    const savedMeal = await meal.save();

    expect(savedMeal.description).toBe(""); // valor por defecto
    expect(savedMeal.ingredients).toEqual([]); // valor por defecto
  });
});
