import { Router } from "express";
import { ClientsPrismaRepository } from "../repositories/clients.prisma.repository";
import { ClientsService } from "../services/clients.service";
import { ClientsController } from "../controllers/clients.controller";
import { prisma } from "../../../database/prisma.client";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";

export const clientsRoutes = Router();

const clientRepository = new ClientsPrismaRepository(prisma);
const clientService = new ClientsService(clientRepository);
const clientController = new ClientsController(clientService);

clientsRoutes.post("/clients", authMiddleware, (req, res) =>
  clientController.create(req, res)
);
clientsRoutes.get("/clients", authMiddleware, (req, res) =>
  clientController.read(req, res)
);
clientsRoutes.put("/clients/:id", authMiddleware, (req, res) =>
  clientController.update(req, res)
);

clientsRoutes.delete("/clients/:id", authMiddleware, (req, res) =>
  clientController.delete(req, res)
);
