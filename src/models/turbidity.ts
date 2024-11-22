import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedTurbidity, Turbidity } from "../interfaces/turbidity";

// Obtener todas las lecturas de turbidez
export const findAllTurbidity = async (
  limit: number,
  offset: number,
): Promise<PaginatedTurbidity> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM turbidity LIMIT ? OFFSET ?",
    [limit, offset],
  );
  // Consulta para obtener el total de registros
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM turbidity",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / limit);

  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as Turbidity[],
  };
};

// Insertar una nueva lectura de turbidez
export const insertTurbidity = async (
  turbidity: Turbidity,
): Promise<Turbidity> => {
  const { turbidity: turbidityValue } = turbidity;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO turbidity (turbidity) 
     VALUES (?, ?)`,
    [turbidityValue],
  );
  const { insertId } = result;
  return { id: insertId, turbidity: turbidityValue };
};

// Actualizar una lectura de turbidez
export const updateTurbidity = async (
  id: number,
  turbidity: Turbidity,
): Promise<Turbidity> => {
  const { turbidity: turbidityValue } = turbidity;
  await pool.query<ResultSetHeader>(
    `UPDATE turbidity
     SET turbidity = ?, 
     WHERE id = ?;`,
    [turbidityValue, id],
  );

  return { id, turbidity: turbidityValue };
};

// Eliminar una lectura de turbidez
export const deleteTurbidity = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>(`DELETE FROM turbidity WHERE id = ?`, [id]);
  return id;
};
