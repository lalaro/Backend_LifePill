
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mealRepository = require("../src/repositories/mealRepository");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("crear y listar meals", async () => {
  await mealRepository.crear({
    name: "Ensalada",
    description: "Fresca",
    calories: 200,
    proteins: 5,
    carbohydrates: 30,
    fats: 8,
    ingredients: ["lechuga", "tomate"],
    preparationTime: 10
  });
  const meals = await mealRepository.listar();
  expect(meals.length).toBe(1);
  expect(meals[0].name).toBe("Ensalada");
});
