jest.mock("google-auth-library", () => {
  const verifyIdTokenMock = jest.fn();
  return {
    OAuth2Client: jest.fn().mockImplementation(() => ({
      verifyIdToken: verifyIdTokenMock,
    })),
    __verifyIdTokenMock: verifyIdTokenMock,
  };
});

jest.mock("../../src/repositories/userRepository");
jest.mock("../../src/repositories/userProfileRepository");
jest.mock("../../src/utils/authToken");

const { OAuth2Client, __verifyIdTokenMock: verifyIdTokenMock } = require("google-auth-library");
const userRepository = require("../../src/repositories/userRepository");
const userProfileRepository = require("../../src/repositories/userProfileRepository");
const { signJwt } = require("../../src/utils/authToken");
const googleAuthController = require("../../src/controllers/googleAuthController");

process.env.GOOGLE_CLIENT_ID = "test-client-id";

describe("googleAuthController.authenticateWithGoogle", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("Falta idToken", async () => {
    req.body = {};
    await googleAuthController.authenticateWithGoogle(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Falta el idToken en la solicitud" })
    );
  });

  test("Correo no verificado", async () => {
    verifyIdTokenMock.mockResolvedValue({
      getPayload: () => ({ email_verified: false }),
    });

    req.body = { idToken: "fake-id" };
    await googleAuthController.authenticateWithGoogle(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Token inválido o correo no verificado" })
    );
  });

  test("Usuario nuevo", async () => {
    const payload = {
      email_verified: true,
      email: "new@test.com",
      name: "New User",
      sub: "google123",
      picture: "pic.jpg",
    };
    verifyIdTokenMock.mockResolvedValue({ getPayload: () => payload });

    userRepository.obtenerPorEmail.mockResolvedValue(null);
    userRepository.crear.mockResolvedValue({ _id: "u1", ...payload, role: "user" });
    userProfileRepository.crear.mockResolvedValue({ toObject: () => ({ id: "p1" }) });
    userRepository.actualizar.mockResolvedValue({});
    signJwt.mockReturnValue("fake-jwt");

    req.body = { idToken: "valid-token" };
    await googleAuthController.authenticateWithGoogle(req, res);

    expect(userRepository.crear).toHaveBeenCalled();
    expect(userProfileRepository.crear).toHaveBeenCalled();
    expect(signJwt).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "u1", email: "new@test.com", role: "user" })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Autenticación exitosa con Google",
        token: "fake-jwt",
      })
    );
  });

  test("Usuario existente", async () => {
    const payload = {
      email_verified: true,
      email: "exists@test.com",
      name: "Existing User",
      sub: "google456",
      picture: "pic.jpg",
    };
    verifyIdTokenMock.mockResolvedValue({ getPayload: () => payload });

    const existingUser = {
      _id: "u2",
      email: "exists@test.com",
      name: "Existing User",
      role: "user",
      profile: { id: "p2" },
    };

    userRepository.obtenerPorEmail.mockResolvedValue(existingUser);
    signJwt.mockReturnValue("jwt-existing");

    req.body = { idToken: "valid-token" };
    await googleAuthController.authenticateWithGoogle(req, res);

    expect(userRepository.crear).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Autenticación exitosa con Google",
        token: "jwt-existing",
      })
    );
  });

  test("Error inesperado", async () => {
    verifyIdTokenMock.mockRejectedValue(new Error("Google API Down"));
    req.body = { idToken: "invalid" };
    await googleAuthController.authenticateWithGoogle(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Token inválido o expirado",
        error: "Google API Down",
      })
    );
  });
});
