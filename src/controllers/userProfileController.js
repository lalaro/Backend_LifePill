
const UserProfile = require("../models/UserProfile");

const getUserProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.params.id);
    if (!profile) return res.status(404).send("Profile not found");
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUserProfile = async (req, res) => {
  try {
    const newProfile = new UserProfile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar perfil
const deleteUserProfile = async (req, res) => {
  try {
    const deleted = await UserProfile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  getUserProfiles, 
  getUserProfileById, 
  createUserProfile, 
  updateUserProfile, 
  deleteUserProfile 
};
