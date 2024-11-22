// routes/turbidity.ts
import { Router } from "express";
import {
  createTurbidityReading,
  getTurbidityData,
} from "../controllers/turbidity";
import validate from "../middlewares/validate";
import { turbiditySchema } from "../schemas/turbidity";

const router = Router();

// Obtener todos los registros de turbidez en la base de datos
router.get("/", getTurbidityData);

// Crear un nuevo registro de turbidez
router.post("/", validate(turbiditySchema), createTurbidityReading);

export default router;
