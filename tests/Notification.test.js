const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Notification = require("../src/models/Notification");

let mongoServer;

describe("Notification Model", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }, 20000);

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("debería crear una notificación válida correctamente", async () => {
    const notificationData = {
      userId: new mongoose.Types.ObjectId(),
      message: "Tu pedido ha sido entregado",
    };

    const notification = new Notification(notificationData);
    const savedNotification = await notification.save();

    expect(savedNotification._id).toBeDefined();
    expect(savedNotification.userId).toEqual(notificationData.userId);
    expect(savedNotification.message).toBe(notificationData.message);
    expect(savedNotification.read).toBe(false); // valor por defecto
  });

  test("debería fallar si faltan campos requeridos", async () => {
    const notification = new Notification({});

    let error;
    try {
      await notification.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.userId).toBeDefined();
    expect(error.errors.message).toBeDefined();
  });

  test("debería asignar valores por defecto correctamente", async () => {
    const notificationData = {
      userId: new mongoose.Types.ObjectId(),
      message: "Bienvenido a la app",
    };

    const savedNotification = await new Notification(notificationData).save();

    expect(savedNotification.read).toBe(false);
    expect(savedNotification.date).toBeInstanceOf(Date);
  });
});
