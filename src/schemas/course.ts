import { z } from "zod";

export const courseSchema = z.object({
  course_name: z
    .string()
    .min(1, { message: "El nombre del curso es obligatorio" })
    .max(100, {
      message: "El nombre del curso no debe exceder 100 caracteres",
    }),
  credits: z
    .number()
    .int()
    .min(1, { message: "Los créditos deben ser al menos 1" }),
  description: z
    .string()
    .max(300, { message: "La descripción no debe exceder 300 caracteres" }),
});
