import { Router } from "express";
import { UsersPrismaRepository } from "../repositories/users.prisma.repository";
import { UsersService } from "../services/users.service";

import { prisma } from "../../../database/prisma.client";
import { UserController } from "../controllers/user.controller";

export const usersRoutes = Router();

// Instâncias necessárias
const usersRepository = new UsersPrismaRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UserController(usersService);

// Rotas
usersRoutes.post("/users", (req, res) => usersController.create(req, res));
usersRoutes.post("/login", (req, res) => usersController.login(req, res));

export default usersRoutes;
