jest.mock("google-auth-library", () => {
  return {
    OAuth2Client: jest.fn().mockImplementation(() => ({
      verifyIdToken: jest.fn().mockResolvedValue({
        getPayload: () => ({
          name: "Test",
          email: "test@gmail.com",
          picture: "pic.jpg",
        }),
      }),
    })),
  };
});

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../src/repositories/userRepository");

// --- Imports ---
const authController = require("../src/controllers/authController");
const userRepository = require("../src/repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- Variables de entorno ---
process.env.JWT_SECRET = "secret";
process.env.JWT_EXPIRES_IN = "1h";
process.env.GOOGLE_CLIENT_ID = "test-client-id";

describe("AuthController", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("Debería registrar un usuario nuevo exitosamente", async () => {
    req.body = { name: "Felipe", email: "felipe@test.com", password: "123456" };

    userRepository.obtenerPorEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed123");
    userRepository.crear.mockResolvedValue({
      _id: "1",
      name: "Felipe",
      email: "felipe@test.com",
    });
    jwt.sign.mockReturnValue("fake-jwt");

    await authController.register(req, res);

    expect(userRepository.obtenerPorEmail).toHaveBeenCalledWith("felipe@test.com");
    expect(userRepository.crear).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Registro exitoso",
        token: "fake-jwt",
      })
    );
  });

  test("Debería devolver error si falta el email o password", async () => {
    req.body = { name: "Felipe" };

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("Nombre, email y contraseña son requeridos"),
      })
    );
  });

  test("Debería hacer login exitoso", async () => {
    req.body = { email: "user@test.com", password: "123456" };

    userRepository.obtenerPorEmail.mockResolvedValue({
      _id: "1",
      email: "user@test.com",
      provider: "local",
      passwordHash: "hashed123",
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-token");

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Login exitoso",
        token: "fake-token",
      })
    );
  });

  test("Debería autenticarse con Google correctamente", async () => {
    req.body = { idToken: "fake-id-token" };

    userRepository.obtenerPorEmail.mockResolvedValue(null);
    userRepository.crear.mockResolvedValue({
      _id: "123",
      name: "Test",
      email: "test@gmail.com",
    });
    jwt.sign.mockReturnValue("google-token");

    await authController.googleAuth(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Autenticación con Google exitosa",
        token: "google-token",
      })
    );
  });
});
