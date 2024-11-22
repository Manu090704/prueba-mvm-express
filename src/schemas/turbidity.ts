import { z } from "zod";

// Esquema para validar datos del sensor de turbidez
export const turbiditySchema = z.object({
  turbidity: z
    .number()
    .min(0, { message: "La turbidez debe ser un número positivo" })
    .max(1000, { message: "El valor de turbidez no puede exceder 1000 NTU" }), // Rango máximo opcional según el sensor
});
