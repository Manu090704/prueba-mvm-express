import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// Definir interfaz para las lecturas del sensor
interface TemperatureReading {
  id?: number;
  sensor_id: string;
  temperature: number;
  timestamp: string;
}

// Obtener todas las lecturas del sensor
export const getTemperatureReadings = async (
  limit: number,
  offset: number,
): Promise<{
  data: TemperatureReading[];
  total: number;
  totalPages: number;
}> => {
  // Obtener las lecturas paginadas
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM temperature_readings ORDER BY timestamp DESC LIMIT ? OFFSET ?",
    [limit, offset],
  );

  // Consultar el número total de lecturas
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM temperature_readings",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(total / limit);

  return {
    data: rows as TemperatureReading[],
    total,
    totalPages,
  };
};

// Insertar una nueva lectura de temperatura
export const insertTemperatureReading = async (
  reading: TemperatureReading,
): Promise<TemperatureReading> => {
  const { sensor_id, temperature, timestamp } = reading;

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO temperature_readings (sensor_id, temperature, timestamp) 
     VALUES (?, ?, ?)`,
    [sensor_id, temperature, timestamp],
  );

  const { insertId } = result;
  return { id: insertId, ...reading };
};

// Actualizar una lectura específica (opcional)
export const updateTemperatureReading = async (
  id: number,
  reading: TemperatureReading,
): Promise<TemperatureReading> => {
  const { sensor_id, temperature, timestamp } = reading;

  await pool.query<ResultSetHeader>(
    `UPDATE temperature_readings
     SET sensor_id = ?, 
         temperature = ?, 
         timestamp = ?
     WHERE id = ?`,
    [sensor_id, temperature, timestamp, id],
  );

  return { id, ...reading };
};

// Eliminar una lectura específica
export const deleteTemperatureReading = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>(
    `DELETE FROM temperature_readings WHERE id = ?`,
    [id],
  );
  return id;
};
