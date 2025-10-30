
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const notificationRepository = require("../../src/repositories/notificationRepository");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("crear y listar notificaciones", async () => {
  const notif = await notificationRepository.crear({
    userId: new mongoose.Types.ObjectId(),
    message: "Bienvenido a LifePill"
  });
  const list = await notificationRepository.listar();
  expect(list.length).toBe(1);
  expect(list[0].message).toBe("Bienvenido a LifePill");
});
