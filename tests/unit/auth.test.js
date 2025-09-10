// tests/unit/auth.test.js
const { forgotPassword, resetPassword } = require("../../src/controllers/authController");
const User = require("../../src/models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

jest.mock("../../src/models/User");
jest.mock("nodemailer");
jest.mock("bcrypt");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  test("forgotPassword devuelve 404 si no existe usuario", async () => {
    User.findOne.mockResolvedValue(null);
    req.body.email = "test@test.com";

    await forgotPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  test("resetPassword actualiza la contraseña correctamente", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const fakeUser = {
      email: "test@test.com",
      resetPasswordCode: "123456",
      resetPasswordExpires: Date.now() + 10000,
      save: jest.fn()
    };

    User.findOne.mockResolvedValue(fakeUser);
    req.body = { email: "test@test.com", code: "123456", password: "newPass" };

    await resetPassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(fakeUser.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: "Contraseña actualizada con éxito" });
  });
});