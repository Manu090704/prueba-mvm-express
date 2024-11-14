import { Request, Response } from "express";

import { deleteById, findAll, update } from "../services/course";
import { insertCourse } from "../models/course";
import { Course } from "../interfaces/course";

// Obtener todos los cursos
export const getCourses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;
    const courses = await findAll(limit, offset);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener cursos", error });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course: Course = req.body;
    const newCourse = await insertCourse(course);
    const io = req.app.get("io");
    io.emit("newCourse", newCourse);
    await insertCourse(course);
    res.status(201).json({ message: "Curso creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear curso", error });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const course: Course = req.body;
    await update(id, course);
    res.status(201).json({ message: "Curso actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el curso", error });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res.status(201).json({ message: "Curso eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el curso", error });
  }
};