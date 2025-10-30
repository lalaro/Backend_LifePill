// tests/authMiddleware.test.js

const { authenticate } = require("../../src/middlewares/authMiddleware");
const { verifyJwt } = require("../../src/utils/authToken");

jest.mock("../../src/utils/authToken");

describe("authMiddleware.authenticate", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("debería devolver 401 si no hay header de autorización", () => {
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "No token provided" })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("debería devolver 401 si el formato del token no es válido", () => {
    req.headers.authorization = "InvalidToken";

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "No token provided" })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("debería devolver 401 si el token es inválido o expirado", () => {
    req.headers.authorization = "Bearer fakeToken";
    verifyJwt.mockReturnValue(null);

    authenticate(req, res, next);

    expect(verifyJwt).toHaveBeenCalledWith("fakeToken");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid or expired token" })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("debería establecer req.user y llamar a next() si el token es válido", () => {
    req.headers.authorization = "Bearer validToken";
    const mockPayload = { userId: "123", email: "test@test.com", role: "user" };
    verifyJwt.mockReturnValue(mockPayload);

    authenticate(req, res, next);

    expect(verifyJwt).toHaveBeenCalledWith("validToken");
    expect(req.user).toEqual(mockPayload);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
