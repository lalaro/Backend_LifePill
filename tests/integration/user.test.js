// tests/integration/user.test.js
const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../../app");
const User = require("../../src/models/User");

describe("User API", () => {
  it("POST /users crea un usuario", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: "John Doe",
      email: "john@test.com",
      password: "123456"
    });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("_id");
  expect(res.body.email).toBe("john@test.com");
});

  it("GET /users obtiene todos los usuarios", async () => {
  const passwordHash = await bcrypt.hash("abc", 10);

  await User.create({
    name: "Jane Doe",
    email: "jane@test.com",
    passwordHash
  });

  const res = await request(app).get("/users");

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].email).toBe("jane@test.com");
});
});