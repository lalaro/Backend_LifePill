
const Notification = require("../models/Notification");

class NotificationRepository {
  async listar() {
    return Notification.find();
  }

  async listarPorUsuario(userId) {
    return Notification.find({ userId });
  }

  async obtenerPorId(id) {
    return Notification.findById(id);
  }

  async crear(data) {
    const notification = new Notification(data);
    return notification.save();
  }

  async actualizar(id, data) {
    return Notification.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return Notification.findByIdAndDelete(id);
  }
}

module.exports = new NotificationRepository();
