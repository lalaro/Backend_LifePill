
const userProfileRepository = require("../repositories/userProfileRepository");


exports.getProfiles = async (req, res) => {
  try {
    const profiles = await userProfileRepository.listar();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await userProfileRepository.obtenerPorId(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await userProfileRepository.obtenerPorUsuario(req.params.userId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createProfile = async (req, res) => {
  try {
    const newProfile = await userProfileRepository.crear(req.body);
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await userProfileRepository.actualizar(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Profile not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await userProfileRepository.eliminar(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
