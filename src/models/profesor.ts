import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedProfesor, Profesor } from "../interfaces/profesor";

// Obtener todos los profesores
export const findAllProfesors = async (
  limit: number,
  offset: number,
): Promise<PaginatedProfesor> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM teachers LIMIT ? OFFSET ?",
    [limit, offset],
  );
  // Consulta para obtener el total de registros
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM teachers",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / limit);

  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as Profesor[],
  };
};

export const insertProfesor = async (profesor: Profesor): Promise<Profesor> => {
  const { first_name, last_name, department, email, address, phone } = profesor;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO teachers (first_name, last_name, department, email, address, phone) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, department, email, address, phone],
  );
  const { insertId } = result;
  return { id: insertId, ...profesor };
};

export const updateProfesor = async (
  id: number,
  profesor: Profesor,
): Promise<Profesor> => {
  const { first_name, last_name, department, email, address, phone } = profesor;
  await pool.query<ResultSetHeader>(
    `UPDATE teachers
     SET first_name = ?, 
         last_name = ?, 
         department = ?, 
         email = ?, 
         address = ?, 
         phone = ?, 
     WHERE id = ?;`,
    [first_name, last_name, department, email, address, phone, id],
  );

  return { id, ...profesor };
};

export const deleteProfesor = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>(`DELETE FROM teachers WHERE id = ?`, [id]);
  return id;
};
