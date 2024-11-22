import { TemperatureReading } from "../interfaces/temperature";
import {
  deleteTemperatureReading,
  getTemperatureReadings,
  updateTemperatureReading,
} from "../models/temperature";

// Obtener todas las lecturas de temperatura
export const findAll = async (limit: number, offset: number) => {
  return await getTemperatureReadings(limit, offset);
};

// Actualizar una lectura de temperatura
export const update = async (id: number, reading: TemperatureReading) => {
  return await updateTemperatureReading(id, reading);
};

// Eliminar una lectura de temperatura
export const deleteById = async (id: number) => {
  return await deleteTemperatureReading(id);
};
