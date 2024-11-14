// routes/profesors.ts
import { Router } from "express";
import {
  createProfesor,
  deleteProfesor,
  getProfesors,
  updateProfesor,
} from "../controllers/profesor";
import validate from "../middlewares/validate";
import { profesorSchema } from "../schemas/profesor";

const router = Router();

// Regresa todos los profesores en la base de datos
router.get("/", getProfesors);
router.post("/", validate(profesorSchema), createProfesor);
router.put("/:id", validate(profesorSchema), updateProfesor);
router.delete("/:id", deleteProfesor);

export default router;
