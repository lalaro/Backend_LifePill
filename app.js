const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const authRoutes = require('./src/routes/authRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LifePill API",
            version: "1.0.0",
            description: "Documentación automática con Swagger para la API de LifePill",
        },
        servers: [
            { url: "http://localhost:8085" }
        ],
    },
    apis: ["./src/routes/*.js"], // Documentación desde tus rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(err => console.error("❌ Error conectando a MongoDB:", err));

app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/profiles', userProfileRoutes);
app.use('/meals', mealRoutes);
app.use('/notifications', notificationRoutes);

app.listen(8085, () => {
    console.log('🚀 Server is running on port 8085');
    console.log('📄 Swagger docs en http://localhost:8085/api/docs');
});
