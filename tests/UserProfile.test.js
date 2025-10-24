const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const UserProfile = require("../src/models/UserProfile");

let mongoServer;

describe("UserProfile Model", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }, 20000);

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("debería crear un perfil de usuario válido correctamente", async () => {
    const userId = new mongoose.Types.ObjectId();

    const profileData = {
      userid: userId,
      birthdate: new Date("2000-01-01"),
      dietaryRestrictions: ["vegan"],
      allergies: ["nuts"],
      height: 175,
      weight: 70,
      fitnessLevel: "intermediate",
      targetWeight: 68,
    };

    const profile = new UserProfile(profileData);
    const savedProfile = await profile.save();

    expect(savedProfile._id).toBeDefined();
    expect(savedProfile.userid).toEqual(userId);
    expect(savedProfile.fitnessLevel).toBe("intermediate");
    expect(savedProfile.dietaryRestrictions).toContain("vegan");
    expect(savedProfile.allergies).toContain("nuts");
  });

  test("debería fallar si falta el userId (campo requerido)", async () => {
    const profile = new UserProfile({ height: 180 });

    let error;
    try {
      await profile.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.userid).toBeDefined();
  });

  test("debería asignar valores por defecto correctamente", async () => {
    const userId = new mongoose.Types.ObjectId();

    const profile = await new UserProfile({ userid: userId }).save();

    expect(profile.birthdate).toBeNull();
    expect(profile.preferences).toEqual({});
    expect(profile.dietaryRestrictions).toEqual([]);
    expect(profile.allergies).toEqual([]);
    expect(profile.height).toBe(0);
    expect(profile.weight).toBe(0);
    expect(profile.fitnessLevel).toBe("beginner");
    expect(profile.targetWeight).toBe(0);
  });
});
