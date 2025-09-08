const express = require('express');
const dotenv = require('dotenv');

// Rutas
const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Rutas principales
app.get('/', (req, res) => {
    res.send('Hello World!');
});
 
app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});

// API routes
app.use('/users', userRoutes);
app.use('/meals', mealRoutes);
app.use('/userProfiles', userProfileRoutes);
app.use('/notifications', notificationRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});