import { Request, Response } from "express";

import { deleteById, findAll, update } from "../services/temperature";
import { insertTemperatureReading } from "../models/temperature";
import { TemperatureReading } from "../interfaces/temperature";

// Obtener todas las lecturas de temperatura
export const getTemperatureReadings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; // Default limit: 10 readings
    const offset = (page - 1) * limit;
    const readings = await findAll(limit, offset);
    res.status(200).json(readings);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al obtener lecturas de temperatura", error });
  }
};

// Crear una nueva lectura de temperatura
export const createTemperatureReading = async (req: Request, res: Response) => {
  try {
    const reading: TemperatureReading = req.body; // Lectura recibida desde el sensor
    const newReading = await insertTemperatureReading(reading);
    const io = req.app.get("io"); // Socket.io para notificaciones en tiempo real
    io.emit("newTemperatureReading", newReading);
    res.status(201).json({
      message: "Lectura de temperatura creada exitosamente",
      data: newReading,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear lectura de temperatura", error });
  }
};

// Actualizar una lectura de temperatura existente
export const updateTemperatureReading = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const reading: TemperatureReading = req.body;
    await update(id, reading);
    res
      .status(200)
      .json({ message: "Lectura de temperatura actualizada exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar lectura de temperatura", error });
  }
};

// Eliminar una lectura de temperatura
export const deleteTemperatureReading = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res
      .status(200)
      .json({ message: "Lectura de temperatura eliminada exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al eliminar lectura de temperatura", error });
  }
};
