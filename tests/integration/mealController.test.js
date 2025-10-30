const mealRepository = require("../../src/repositories/mealRepository");
const mealController = require("../../src/controllers/mealController");

jest.mock("../../src/repositories/mealRepository");

describe("mealController", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // 🧪 getMeals
  test("getMeals - debería devolver la lista de comidas", async () => {
    const mockMeals = [{ id: 1, name: "Pizza" }];
    mealRepository.listar.mockResolvedValue(mockMeals);

    await mealController.getMeals(req, res);

    expect(mealRepository.listar).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockMeals);
  });

  test("getMeals - debería manejar error interno", async () => {
    mealRepository.listar.mockRejectedValue(new Error("DB error"));

    await mealController.getMeals(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "DB error" })
    );
  });

  // 🧪 getMealById
  test("getMealById - debería devolver una comida específica", async () => {
    req.params.id = "123";
    const mockMeal = { id: "123", name: "Salad" };
    mealRepository.obtenerPorId.mockResolvedValue(mockMeal);

    await mealController.getMealById(req, res);

    expect(mealRepository.obtenerPorId).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith(mockMeal);
  });

  test("getMealById - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "999";
    mealRepository.obtenerPorId.mockResolvedValue(null);

    await mealController.getMealById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Meal not found" })
    );
  });

  test("getMealById - debería manejar error interno", async () => {
    req.params.id = "999";
    mealRepository.obtenerPorId.mockRejectedValue(new Error("DB crash"));

    await mealController.getMealById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "DB crash" })
    );
  });

  // 🧪 createMeal
  test("createMeal - debería crear una comida nueva", async () => {
    req.body = { name: "Pasta" };
    const mockCreated = { id: "1", name: "Pasta" };
    mealRepository.crear.mockResolvedValue(mockCreated);

    await mealController.createMeal(req, res);

    expect(mealRepository.crear).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreated);
  });

  test("createMeal - debería manejar error de validación", async () => {
    req.body = { name: "" };
    mealRepository.crear.mockRejectedValue(new Error("Invalid data"));

    await mealController.createMeal(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Invalid data" })
    );
  });

  // 🧪 updateMeal
  test("updateMeal - debería actualizar una comida existente", async () => {
    req.params.id = "5";
    req.body = { name: "Updated Meal" };
    const updated = { id: "5", name: "Updated Meal" };
    mealRepository.actualizar.mockResolvedValue(updated);

    await mealController.updateMeal(req, res);

    expect(mealRepository.actualizar).toHaveBeenCalledWith("5", req.body);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("updateMeal - debería devolver 404 si no existe", async () => {
    req.params.id = "5";
    mealRepository.actualizar.mockResolvedValue(null);

    await mealController.updateMeal(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Meal not found" })
    );
  });

  test("updateMeal - debería manejar error interno", async () => {
    req.params.id = "5";
    mealRepository.actualizar.mockRejectedValue(new Error("Update error"));

    await mealController.updateMeal(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Update error" })
    );
  });

  // 🧪 deleteMeal
  test("deleteMeal - debería eliminar una comida", async () => {
    req.params.id = "9";
    const deleted = { id: "9", name: "Deleted Meal" };
    mealRepository.eliminar.mockResolvedValue(deleted);

    await mealController.deleteMeal(req, res);

    expect(mealRepository.eliminar).toHaveBeenCalledWith("9");
    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  test("deleteMeal - debería devolver 404 si no existe", async () => {
    req.params.id = "9";
    mealRepository.eliminar.mockResolvedValue(null);

    await mealController.deleteMeal(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Meal not found" })
    );
  });

  test("deleteMeal - debería manejar error interno", async () => {
    req.params.id = "9";
    mealRepository.eliminar.mockRejectedValue(new Error("Delete failed"));

    await mealController.deleteMeal(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Delete failed" })
    );
  });
});
