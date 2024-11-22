import { Turbidity } from "../interfaces/turbidity";
import {
  deleteTurbidity,
  findAllTurbidity,
  insertTurbidity,
} from "../models/turbidity";

// Obtener todas las entradas de turbidez
export const findAll = async (limit: number, offset: number) => {
  return await findAllTurbidity(limit, offset);
};

// Crear una nueva entrada de turbidez
export const create = async (turbidity: Turbidity) => {
  return await insertTurbidity(turbidity);
};

// Eliminar una entrada de turbidez por ID
export const deleteById = async (id: number) => {
  return await deleteTurbidity(id);
};
