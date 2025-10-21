const User = require("../models/User");

class UserRepository {
  async listar() {
    return User.find();
  }

  async obtenerPorId(id) {
    return User.findById(id);
  }

  async obtenerPorEmail(email) {
    return User.findOne({ email });
  }

  async crear(data) {
    const user = new User(data);
    return user.save();
  }

  async actualizar(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
