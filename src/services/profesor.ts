import { Profesor } from "../interfaces/profesor";
import {
  deleteProfesor,
  findAllProfesors,
  updateProfesor,
} from "../models/profesor";

// Obtener todos los profesores
export const findAll = async (limit: number, offset: number) => {
  return await findAllProfesors(limit, offset);
};

export const update = async (id: number, profesor: Profesor) => {
  return await updateProfesor(id, profesor);
};

export const deleteById = async (id: number) => {
  return await deleteProfesor(id);
};
