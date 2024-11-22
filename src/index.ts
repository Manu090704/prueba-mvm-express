import dotenvFlow from "dotenv-flow";
import express from "express";
import temperatureRouter from "./routes/temperature"; // Importar la ruta para temperaturas
import turbidityRouter from "./routes/turbidity"; // Ruta para turbidez
import testRoutes from "./routes/test"; // Rutas de prueba
import unknownResource from "./middlewares/unknown-resource"; // Middleware para recurso no encontrado
import unknownError from "./middlewares/unknown-error"; // Middleware para errores no manejados
import validationError from "./middlewares/validation-error"; // Middleware para errores de validación
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

// Cargar las variables de entorno (si no es producción)
if (process.env.NODE_ENV !== "production") {
  dotenvFlow.config();
}

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Ajusta esto al origen de tu frontend
    methods: ["GET", "POST"],
  },
});

// Middleware para CORS - Permite todas las solicitudes
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use("/api/v1/temperature", temperatureRouter); // Ruta para temperaturas
app.use("/api/v1/turbidity", turbidityRouter); // Ruta para turbidez

// Rutas de prueba (si las necesitas)
app.use("/error", testRoutes);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Hacer que io esté accesible para los routers/controladores
app.set("io", io);

// Middlewares
app.use(validationError); // Error de validación
app.use(unknownResource); // Error 404, recurso no encontrado

// Middlewares de error
app.use(unknownError);

server.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`Escuchando en el puerto ${process.env.SERVER_PORT || 3001}`);
});
