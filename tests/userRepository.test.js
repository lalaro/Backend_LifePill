const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userRepository = require("../src/repositories/userRepository");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("crear y listar usuarios", async () => {
  await userRepository.crear({ name: "Juan", email: "j@e.com", passwordHash: "hash" });
  const users = await userRepository.listar();
  expect(users.length).toBe(1);
  expect(users[0].name).toBe("Juan");
});
