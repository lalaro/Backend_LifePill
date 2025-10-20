const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const UserProfile = require("../models/UserProfile");

exports.getUsers = async (req, res) => {
  try {
    const users = await userRepository.listar();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersById = async (req, res) => {
  try {
    const user = await userRepository.obtenerPorId(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await userRepository.crear(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userRepository.actualizar(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userRepository.eliminar(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Registro con transacción
exports.userRegister = async (req, res) => {
  const session = await userRepository.startSession();
  session.startTransaction();
  try {
    const { name, birthDate, phoneNumber, email, password, weight, height } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userRepository.crear({
      name,
      email,
      passwordHash,
      role: "user",
      phoneNumber: phoneNumber ?? null,
    });

    const newProfile = new UserProfile({
      userid: newUser._id,
      birthdate: birthDate ? new Date(birthDate) : null,
      height: height ?? 0,
      weight: weight ?? 0,
    });
    await newProfile.save({ session });

    newUser.profile = newProfile.toObject();
    await newUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ user: newUser, profile: newProfile });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};
