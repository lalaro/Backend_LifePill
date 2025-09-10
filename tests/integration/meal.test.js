const request = require("supertest");
const app = require("../../app");
const Meal = require("../../src/models/Meal");

describe("Meal API", () => {

  it("CRUD de meals completo", async () => {
  // 1. Crear
  const createRes = await request(app).post("/meals").send({
    name: "Ensalada César",
    description: "Clásica ensalada saludable",
    calories: 350,
    proteins: 10,
    carbohydrates: 20,
    fats: 15,
    ingredients: ["lechuga", "pollo", "queso parmesano"],
    preparationTime: 15
  });

  expect(createRes.status).toBe(201);
  const mealId = createRes.body._id;

  const allRes = await request(app).get("/meals");
  expect(allRes.status).toBe(200);
  expect(allRes.body.length).toBeGreaterThan(0);

  const oneRes = await request(app).get(`/meals/${mealId}`);
  expect(oneRes.status).toBe(200);
  expect(oneRes.body._id).toBe(mealId);

  const updateRes = await request(app).put(`/meals/${mealId}`).send({ name: "Ensalada Griega" });
  expect(updateRes.status).toBe(200);
  expect(updateRes.body.name).toBe("Ensalada Griega");

  const deleteRes = await request(app).delete(`/meals/${mealId}`);
  expect(deleteRes.status).toBe(200);
  expect(deleteRes.body._id).toBe(mealId);
});
});