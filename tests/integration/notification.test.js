const request = require("supertest");
const app = require("../../app");
const User = require("../../src/models/User");
const Notification = require("../../src/models/Notification");

describe("Notification API", () => {
  it("CRUD completo de notifications", async () => {
    // 1. Crear primero un usuario para referenciar en la notificación
    const userRes = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        email: "testuser@test.com",
        password: "123456"  // sera convertido a passwordHash por el userController
      });

    expect(userRes.status).toBe(201);
    const userId = userRes.body._id;

    // 2. Crear notificación para este user
    const createRes = await request(app)
      .post("/notifications")
      .send({
        userId,
        message: "Este es un mensaje de prueba"
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body).toHaveProperty("_id");
    expect(createRes.body.userId).toBe(userId);
    expect(createRes.body.message).toBe("Este es un mensaje de prueba");

    const notificationId = createRes.body._id;

    // 3. Obtener todas las notificaciones
    const allRes = await request(app).get("/notifications");

    expect(allRes.status).toBe(200);
    expect(Array.isArray(allRes.body)).toBe(true);
    expect(allRes.body.length).toBeGreaterThan(0);

    // 4. Obtener notificación por ID
    const oneRes = await request(app).get(`/notifications/${notificationId}`);

    expect(oneRes.status).toBe(200);
    expect(oneRes.body._id).toBe(notificationId);

    // 5. Actualizar notificación (ej, marcar como leída)
    const updateRes = await request(app)
      .put(`/notifications/${notificationId}`)
      .send({ read: true });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.read).toBe(true);

    // 6. Borrar notificación
    const deleteRes = await request(app).delete(`/notifications/${notificationId}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body._id).toBe(notificationId);

    // 7. Confirmar que ya no existe
    const checkRes = await request(app).get(`/notifications/${notificationId}`);
    expect(checkRes.status).toBe(404);
  });
});