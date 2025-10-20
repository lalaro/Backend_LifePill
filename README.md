# Backend_LifePill

## Descripción del proyecto
Backend_LifePill es una API RESTful desarrollada en Node.js y Express, orientada a la gestión de usuarios, control de medicamentos y recomendaciones personalizadas para el bienestar y la salud. El sistema permite registrar usuarios, administrar información médica y consultar recomendaciones, facilitando la integración con aplicaciones móviles o web.

## Versión del lenguaje
- Node.js (recomendado: >=14.x)
- JavaScript (ES6+)

## Dependencias iniciales
- express ^5.1.0
- dotenv
- nodemon (desarrollo)
- body-parser
- cors
- mongoose (si usas MongoDB)
- jsonwebtoken (si usas autenticación JWT)
- bcryptjs (si usas encriptación de contraseñas)

> **Nota:** Verifica el archivo `package.json` para la lista completa de dependencias y versiones.

## Instrucciones de instalación y ejecución

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/lalaro/Backend_LifePill.git
   cd Backend_LifePill
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```
3. **Instala las dependencias de desarrollo para pruebas:**
   ```sh
   npm install --save-dev jest supertest @shelf/jest-mongodb mongodb-memory-server
   ```
4. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
     ```
     PORT=8085
     DB_URI=mongodb+srv://juanestebancancelado63_db_user:bWG9cTOetjzTVdcu@lifepill0.fowp8ns.mongodb.net/lifepill?
     ```

5. **Inicia el servidor:**
   ```sh
   npm run start
   ```
   - Para desarrollo con recarga automática:
     ```sh
     npm run dev
     ```
6. **Ejecuta las pruebas:**
   ```sh
   npm test
   ```
7. **Accede a las rutas principales:**
   - [http://localhost:8085](http://localhost:8085)
   - [http://localhost:8085/lifepill](http://localhost:8085/lifepill)

## Estructura del proyecto

```
Backend_LifePill/
│
├── src/
│   ├── controllers/      # Controladores con lógica de negocio
│   ├── models/           # Modelos de datos (MongoDB)
│   ├── routes/           # Definición de rutas y endpoints
│   ├── middlewares/      # Validaciones y middlewares de seguridad
│   └── app.js            # Configuración principal de la app
│
├── tests/                # Pruebas unitarias e integración
├── .env
├── package.json
└── README.md

```

## Scripts útiles

- `npm run start` — Inicia el servidor en modo producción.
- `npm run dev` — Inicia el servidor en modo desarrollo con recarga automática (requiere nodemon).
- `npm test` — Ejecuta las pruebas con jest y supertest.

## Enlace a la planeación

Consulta la herramienta de planeación y documentación en el siguiente enlace:
