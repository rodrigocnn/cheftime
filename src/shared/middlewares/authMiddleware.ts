import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// interface para tipar o payload do token
interface JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    // normalmente vem no formato: "Bearer token_aqui"
    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // adiciona o usuário no request para usar em outras rotas
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
