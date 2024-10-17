import { Student } from "../interfaces/student";
import {
  deleteStudent,
  findAllStudents,
  updateStudent,
} from "../models/student";

// Obtener todos los alumnos
export const findAll = async () => {
  return await findAllStudents();
};

export const update = async (id: number, student: Student) => {
  return await updateStudent(id, student);
};

export const deleteById = async (id: number) => {
  return await deleteStudent(id);
};
