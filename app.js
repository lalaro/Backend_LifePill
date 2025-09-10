// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const authRoutes = require('./src/routes/authRoutes');

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

// API routes
app.use('/users', userRoutes);
app.use('/profiles', userProfileRoutes);
app.use('/meals', mealRoutes);
app.use('/notifications', notificationRoutes);
app.use('/auth', authRoutes);

module.exports = app;