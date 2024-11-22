import { z } from "zod";

// Esquema para validar lecturas del sensor de temperatura
export const temperatureReadingSchema = z.object({
  sensor_id: z
    .string()
    .min(1, { message: "El ID del sensor es obligatorio" })
    .max(50, { message: "El ID del sensor no debe exceder 50 caracteres" }),
  temperature: z
    .number()
    .min(-55, { message: "La temperatura no puede ser menor a -55°C" }) // Rango DS18B20
    .max(125, { message: "La temperatura no puede ser mayor a 125°C" }),
  timestamp: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "La marca temporal debe ser una fecha válida en formato ISO 8601",
  }),
});
