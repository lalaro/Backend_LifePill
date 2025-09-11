
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userProfileRepository = require("../src/repositories/userProfileRepository");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("crear y obtener perfil", async () => {
  const newProfile = await userProfileRepository.crear({
    userid: new mongoose.Types.ObjectId(),
    height: 175,
    weight: 70,
    fitnessLevel: "intermediate"
  });
  const found = await userProfileRepository.obtenerPorId(newProfile._id);
  expect(found.height).toBe(175);
});
