const UserProfile = require("../models/UserProfile");

class UserProfileRepository {
  async listar() {
    return UserProfile.find();
  }

  async obtenerPorId(id) {
    return UserProfile.findById(id);
  }

  async obtenerPorUsuario(userId) {
    return UserProfile.findOne({ userid: userId });
  }

  async obtenerPorEmail(email) {
    return User.findOne({ email });
  }
  
  async crear(data) {
    const profile = new UserProfile(data);
    return profile.save();
  }

  async actualizar(id, data) {
    return UserProfile.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return UserProfile.findByIdAndDelete(id);
  }
}

module.exports = new UserProfileRepository();
