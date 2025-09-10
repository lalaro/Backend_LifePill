const request = require("supertest");
const app = require("../../app");
const User = require("../../src/models/User");
const UserProfile = require("../../src/models/UserProfile");

describe("UserProfile API", () => {
  it("CRUD completo de UserProfile", async () => {
    // 1. Crear primero un usuario (para el userId de UserProfile)
    const userRes = await request(app)
      .post("/users")
      .send({
        name: "Test UserProfile",
        email: "testprofile@test.com",
        password: "123456" // se convierte a passwordHash por el controlador
      });

    expect(userRes.status).toBe(201);
    const userId = userRes.body._id;

    // 2. Crear un UserProfile para ese user
    const createRes = await request(app)
      .post("/profiles")
      .send({
        userid: userId,
        preferences: { diet: "vegetarian" },
        dietaryRestrictions: ["gluten-free"],
        allergies: ["peanuts"],
        fitnessLevel: "intermediate",
        targetWeight: 70
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body).toHaveProperty("_id");
    expect(createRes.body.userid).toBe(userId);
    expect(createRes.body.fitnessLevel).toBe("intermediate");

    const profileId = createRes.body._id;

    // 3. Obtener todos los perfiles
    const allRes = await request(app).get("/profiles");
    expect(allRes.status).toBe(200);
    expect(Array.isArray(allRes.body)).toBe(true);
    expect(allRes.body.length).toBeGreaterThan(0);

    // 4. Obtener perfil por ID
    const oneRes = await request(app).get(`/profiles/${profileId}`);
    expect(oneRes.status).toBe(200);
    expect(oneRes.body._id).toBe(profileId);

    // 5. Actualizar perfil (ej: cambiar fitnessLevel)
    const updateRes = await request(app)
      .put(`/profiles/${profileId}`)
      .send({ fitnessLevel: "advanced" });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.fitnessLevel).toBe("advanced");

    // 6. Borrar perfil
    const deleteRes = await request(app).delete(`/profiles/${profileId}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body._id).toBe(profileId);

    // 7. Confirmar que ya no existe
    const checkRes = await request(app).get(`/profiles/${profileId}`);
    expect(checkRes.status).toBe(404);
  });
});