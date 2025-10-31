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
app.use(cors({
  origin: ["http://localhost:8085", "https://lifepill.duckdns.org", "*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
      { url: process.env.NODE_ENV === "production" 
          ? "https://lifepill.duckdns.org:8085" 
          : "http://localhost:8085" 
      }
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});

(async () => {
  try {
    console.log("🔗 Intentando conectar a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, 
    });
    console.log("✅ Conectado a MongoDB Atlas");

    
    app.use('/api/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/profiles', userProfileRoutes);
    app.use('/meals', mealRoutes);
    app.use('/notifications', notificationRoutes);

    
    app.listen(8085, () => {
      console.log('🚀 Server is running on port 8085');
      console.log('📄 Swagger docs en http://localhost:8085/api/docs');
    });

  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err.message);
  }
})();

