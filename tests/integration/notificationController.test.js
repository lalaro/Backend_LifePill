const notificationRepository = require("../../src/repositories/notificationRepository");
const notificationController = require("../../src/controllers/notificationController");

jest.mock("../../src/repositories/notificationRepository", () => ({
  listar: jest.fn(),
  listarPorUsuario: jest.fn(),
  obtenerPorId: jest.fn(),
  crear: jest.fn(),
  actualizar: jest.fn(),
  eliminar: jest.fn(),
}));

describe("notificationController", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // 🧪 getNotifications
  test("getNotifications - debería devolver todas las notificaciones", async () => {
    const mockNotifications = [{ id: 1, message: "Hola!" }];
    notificationRepository.listar.mockResolvedValue(mockNotifications);

    await notificationController.getNotifications(req, res);

    expect(notificationRepository.listar).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockNotifications);
  });

  test("getNotifications - debería manejar error interno", async () => {
    notificationRepository.listar.mockRejectedValue(new Error("DB error"));

    await notificationController.getNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "DB error" }));
  });

  // 🧪 getNotificationsByUser
  test("getNotificationsByUser - debería devolver notificaciones del usuario", async () => {
    req.params.userId = "u123";
    const mockUserNotifications = [{ id: 1, userId: "u123", message: "Alerta!" }];
    notificationRepository.listarPorUsuario.mockResolvedValue(mockUserNotifications);

    await notificationController.getNotificationsByUser(req, res);

    expect(notificationRepository.listarPorUsuario).toHaveBeenCalledWith("u123");
    expect(res.json).toHaveBeenCalledWith(mockUserNotifications);
  });

  test("getNotificationsByUser - debería manejar error interno", async () => {
    req.params.userId = "u123";
    notificationRepository.listarPorUsuario.mockRejectedValue(new Error("User error"));

    await notificationController.getNotificationsByUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "User error" }));
  });

  // 🧪 getNotificationById
  test("getNotificationById - debería devolver una notificación específica", async () => {
    req.params.id = "n123";
    const mockNotification = { id: "n123", message: "Test notification" };
    notificationRepository.obtenerPorId.mockResolvedValue(mockNotification);

    await notificationController.getNotificationById(req, res);

    expect(notificationRepository.obtenerPorId).toHaveBeenCalledWith("n123");
    expect(res.json).toHaveBeenCalledWith(mockNotification);
  });

  test("getNotificationById - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "n404";
    notificationRepository.obtenerPorId.mockResolvedValue(null);

    await notificationController.getNotificationById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Notification not found" }));
  });

  test("getNotificationById - debería manejar error interno", async () => {
    req.params.id = "n500";
    notificationRepository.obtenerPorId.mockRejectedValue(new Error("Crash"));

    await notificationController.getNotificationById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Crash" }));
  });

  // 🧪 createNotification
  test("createNotification - debería crear una nueva notificación", async () => {
    req.body = { message: "Nueva notificación" };
    const created = { id: "1", message: "Nueva notificación" };
    notificationRepository.crear.mockResolvedValue(created);

    await notificationController.createNotification(req, res);

    expect(notificationRepository.crear).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  test("createNotification - debería manejar error de validación", async () => {
    req.body = {};
    notificationRepository.crear.mockRejectedValue(new Error("Invalid data"));

    await notificationController.createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Invalid data" }));
  });

  // 🧪 updateNotification
  test("updateNotification - debería actualizar una notificación existente", async () => {
    req.params.id = "n1";
    req.body = { message: "Actualizado" };
    const updated = { id: "n1", message: "Actualizado" };
    notificationRepository.actualizar.mockResolvedValue(updated);

    await notificationController.updateNotification(req, res);

    expect(notificationRepository.actualizar).toHaveBeenCalledWith("n1", req.body);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("updateNotification - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "n1";
    notificationRepository.actualizar.mockResolvedValue(null);

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Notification not found" }));
  });

  test("updateNotification - debería manejar error interno", async () => {
    req.params.id = "n1";
    notificationRepository.actualizar.mockRejectedValue(new Error("Update error"));

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Update error" }));
  });

  // 🧪 deleteNotification
  test("deleteNotification - debería eliminar una notificación", async () => {
    req.params.id = "n5";
    const deleted = { id: "n5", message: "Eliminada" };
    notificationRepository.eliminar.mockResolvedValue(deleted);

    await notificationController.deleteNotification(req, res);

    expect(notificationRepository.eliminar).toHaveBeenCalledWith("n5");
    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  test("deleteNotification - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "n5";
    notificationRepository.eliminar.mockResolvedValue(null);

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Notification not found" }));
  });

  test("deleteNotification - debería manejar error interno", async () => {
    req.params.id = "n5";
    notificationRepository.eliminar.mockRejectedValue(new Error("Delete fail"));

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Delete fail" }));
  });
});
