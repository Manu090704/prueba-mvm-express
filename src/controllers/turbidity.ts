import { Request, Response } from "express";
import { create, findAll } from "../services/turbidity";
import { Turbidity } from "../interfaces/turbidity";

// Obtener todas las lecturas de turbidez
export const getTurbidityData = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;

    const turbidityData = await findAll(limit, offset);
    res.status(200).json(turbidityData);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al obtener datos de turbidez", error });
  }
};

export const createTurbidityReading = async (req: Request, res: Response) => {
  try {
    const reading: Turbidity = req.body; // Lectura de turbidez recibida desde el sensor
    if (typeof reading.turbidity !== "number") {
      throw new Error("El valor de turbidez debe ser un número");
    }

    // Aquí debes pasar un objeto con la propiedad `value`
    const newReading = await create({ turbidity: reading.turbidity });

    const io = req.app.get("io"); // Socket.io para notificaciones en tiempo real
    io.emit("newTurbidityReading", newReading); // Emitir el nuevo dato de turbidez

    res.status(201).json({
      message: "Lectura de turbidez creada exitosamente",
      data: newReading,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear lectura de turbidez", error });
  }
};
