// src/controllers/authController.js
const { OAuth2Client } = require("google-auth-library");
const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    let user = await userRepository.obtenerPorEmail(email);
    if (!user) {
      user = await userRepository.crear({
        name,
        email,
        picture,
        provider: "google"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ message: "Autenticación exitosa", token, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token inválido o expirado", error: error.message });
  }
};
