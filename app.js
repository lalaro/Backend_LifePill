const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Rutas
const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const authRoutes = require('./src/routes/authRoutes');

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.get('/', (req, res) => {
    res.send('Hello World!');
});
 
app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});

// Conexión a Mongo (Atlas o local, según tu .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

// API routes
app.use('/users', userRoutes);
app.use('/profiles', userProfileRoutes);
app.use('/meals', mealRoutes);
app.use('/notifications', notificationRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});