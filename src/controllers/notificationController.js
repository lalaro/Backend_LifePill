
const notificationRepository = require("../repositories/notificationRepository");


exports.getNotifications = async (req, res) => {
  try {
    const notifications = await notificationRepository.listar();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getNotificationsByUser = async (req, res) => {
  try {
    const notifications = await notificationRepository.listarPorUsuario(req.params.userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getNotificationById = async (req, res) => {
  try {
    const notification = await notificationRepository.obtenerPorId(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createNotification = async (req, res) => {
  try {
    const newNotification = await notificationRepository.crear(req.body);
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const updated = await notificationRepository.actualizar(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Notification not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await notificationRepository.eliminar(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Notification not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
