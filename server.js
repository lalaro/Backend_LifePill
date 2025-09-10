// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

// Conexión a Mongo real (Atlas/local)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});