const userController = require("../src/controllers/userController");
const userRepository = require("../src/repositories/userRepository");
const UserProfile = require("../src/models/UserProfile");
const bcrypt = require("bcrypt");

// 🧩 Mock de dependencias
jest.mock("../src/repositories/userRepository", () => ({
  listar: jest.fn(),
  obtenerPorId: jest.fn(),
  crear: jest.fn(),
  actualizar: jest.fn(),
  eliminar: jest.fn(),
  startSession: jest.fn(),
}));

jest.mock("../src/models/UserProfile", () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    toObject: jest.fn().mockReturnValue({}),
  }));
});

jest.mock("bcrypt");

describe("userController", () => {
  let req, res, session;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    };

    // 👇 asegúrate de definir el mock de startSession aquí también
    userRepository.startSession.mockResolvedValue(session);

    jest.clearAllMocks();
  });

  // ---- GET USERS ----
  it("getUsers - debería devolver todos los usuarios", async () => {
    const users = [{ name: "User1" }];
    userRepository.listar.mockResolvedValue(users);

    await userController.getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  it("getUsers - debería manejar error interno", async () => {
    const error = new Error("DB error");
    userRepository.listar.mockRejectedValue(error);

    await userController.getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // ---- GET USER BY ID ----
  it("getUsersById - debería devolver un usuario", async () => {
    const user = { name: "Juan" };
    userRepository.obtenerPorId.mockResolvedValue(user);
    req.params.id = "123";

    await userController.getUsersById(req, res);

    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("getUsersById - debería devolver 404 si no se encuentra", async () => {
    userRepository.obtenerPorId.mockResolvedValue(null);
    req.params.id = "999";

    await userController.getUsersById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("User not found");
  });

  // ---- CREATE USER ----
  it("createUser - debería crear un usuario", async () => {
    const newUser = { name: "Nuevo" };
    req.body = newUser;
    userRepository.crear.mockResolvedValue(newUser);

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  it("createUser - debería manejar error de validación", async () => {
    const error = new Error("Invalid data");
    userRepository.crear.mockRejectedValue(error);

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data" });
  });

  // ---- UPDATE USER ----
  it("updateUser - debería actualizar un usuario existente", async () => {
    const updatedUser = { name: "Actualizado" };
    req.params.id = "123";
    req.body = updatedUser;
    userRepository.actualizar.mockResolvedValue(updatedUser);

    await userController.updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  it("updateUser - debería devolver 404 si no se encuentra", async () => {
    userRepository.actualizar.mockResolvedValue(null);
    req.params.id = "404";

    await userController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  // ---- DELETE USER ----
  it("deleteUser - debería eliminar un usuario", async () => {
    const deletedUser = { _id: "123" };
    req.params.id = "123";
    userRepository.eliminar.mockResolvedValue(deletedUser);

    await userController.deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith(deletedUser);
  });

  it("deleteUser - debería devolver 404 si no se encuentra", async () => {
    userRepository.eliminar.mockResolvedValue(null);
    req.params.id = "404";

    await userController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  // ---- REGISTER USER ----
  it("userRegister - debería registrar un usuario y perfil correctamente", async () => {
    const newUser = { _id: "1", save: jest.fn(), toObject: jest.fn().mockReturnValue({}) };
    const newProfile = { save: jest.fn(), toObject: jest.fn().mockReturnValue({}) };
    UserProfile.mockImplementation(() => newProfile);

    req.body = {
      name: "John",
      email: "john@example.com",
      password: "12345",
      birthDate: "2000-01-01",
      height: 180,
      weight: 75,
    };

    bcrypt.hash.mockResolvedValue("hashedPassword");
    userRepository.crear.mockResolvedValue(newUser);

    await userController.userRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: newUser,
      profile: newProfile,
    });
  });

  it("userRegister - debería devolver error 400 si faltan campos requeridos", async () => {
    req.body = { email: "incompleto@example.com" };

    await userController.userRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Name, email and password are required.",
    });
  });

  it("userRegister - debería manejar errores y abortar transacción", async () => {
    req.body = {
      name: "ErrorUser",
      email: "err@example.com",
      password: "123",
    };
    const error = new Error("DB failure");
    bcrypt.hash.mockRejectedValue(error);

    await userController.userRegister(req, res);

    expect(session.abortTransaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB failure" });
  });
});
