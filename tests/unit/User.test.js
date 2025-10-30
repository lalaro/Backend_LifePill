const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../src/models/User");

let mongoServer;

describe("User Model", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }, 20000);

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("debería crear un usuario válido correctamente", async () => {
    const userData = {
      name: "Felipe",
      email: "felipe@test.com",
      passwordHash: "hashed123",
      phoneNumber: "123456789",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe("user"); // valor por defecto
    expect(savedUser.provider).toBe("local");
    expect(savedUser.healthStats).toEqual([]);
    expect(savedUser.notifications).toEqual([]);
  });

  test("debería fallar si faltan campos requeridos", async () => {
    const user = new User({});

    let error;
    try {
      await user.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });

  test("debería asignar valores por defecto correctamente", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
    };

    const savedUser = await new User(userData).save();

    expect(savedUser.role).toBe("user");
    expect(savedUser.provider).toBe("local");
    expect(savedUser.picture).toBeNull();
    expect(savedUser.profile).toBeNull();
  });
});
