import { Request, Response } from "express";

import { deleteById, findAll, update } from "../services/profesor";
import { insertProfesor } from "../models/profesor";
import { Profesor } from "../interfaces/profesor";

// Obtener todos los profesores
export const getProfesors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;
    const profesores = await findAll(limit, offset);
    res.status(200).json(profesores);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener profesores", error });
  }
};

export const createProfesor = async (req: Request, res: Response) => {
  try {
    const profesor: Profesor = req.body;
    const newProfesor = await insertProfesor(profesor);
    const io = req.app.get("io");
    io.emit("newProfesor", newProfesor);
    await insertProfesor(profesor);
    res.status(201).json({ message: "Profesor creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear profesor", error });
  }
};

export const updateProfesor = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const profesor: Profesor = req.body;
    await update(id, profesor);
    res.status(201).json({ message: "Profesor actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el profesor", error });
  }
};

export const deleteProfesor = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res.status(201).json({ message: "Profesor eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el profesor", error });
  }
};
