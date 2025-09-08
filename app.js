const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const mongoose = require('mongoose');
const cors = require('cors'); 
const dotenv = require('dotenv');

require("dotenv").config();

const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
 
app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

app.use('/users', userRoutes);
app.use('/profiles', userProfileRoutes);
app.use('/meals', mealRoutes);
app.use('/notifications', notificationRoutes);



app.listen(8085, ()    => {
    console.log('Server is running on port 8085');
}); 