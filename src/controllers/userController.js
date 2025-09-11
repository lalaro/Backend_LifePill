const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por ID
const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const userRegister = async (req, res) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    const {
      name,
      birthDate,
      phoneNumber,
      email,
      password,
      weight,
      height
    } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required." });
    }


    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
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
      weight: weight ?? 0
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

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser, userRegister };
