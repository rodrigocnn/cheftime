import { ZodSchema } from "zod";
import { Request, Response } from "express";

export function validateReservation<T>(
  schema: ZodSchema<T>,
  req: Request,
  res: Response
): T | null {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path[0] as string,
      message: issue.message,
    }));

    res.status(400).json({
      message: "Erro de validação",
      errors: formattedErrors,
    });

    return null; // explicitamente retorna null
  }

  return result.data; // sempre retorna algo
}
