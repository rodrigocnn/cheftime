import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // log no console para depuração

  const statusCode = err.statusCode || 500; // se erro customizado tiver statusCode
  const message = err.message || "Erro interno do servidor";

  res.status(statusCode).json({
    error: true,
    message,
  });
}
