import { Router } from "express";

import { prisma } from "../../../database/prisma.client";
import { ReservationsPrismaRepository } from "../repositories/reservations.prisma.repository";
import { ReservationsService } from "../services/reservations.service";
import { ReservationsController } from "../controllers/reservations.controller";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";

export const reservationsRoutes = Router();

const reservationsRepository = new ReservationsPrismaRepository(prisma);
const reservationservice = new ReservationsService(reservationsRepository);
const reservationsController = new ReservationsController(reservationservice);

reservationsRoutes.post("/reservations", authMiddleware, (req, res) =>
  reservationsController.create(req, res)
);
reservationsRoutes.get("/reservations", authMiddleware, (req, res) =>
  reservationsController.read(req, res)
);
reservationsRoutes.put("/reservations/:id", authMiddleware, (req, res) =>
  reservationsController.update(req, res)
);

reservationsRoutes.delete("/reservations/:id", authMiddleware, (req, res) =>
  reservationsController.delete(req, res)
);

reservationsRoutes.get("/reservations/available", authMiddleware, (req, res) =>
  reservationsController.getAvailable(req, res)
);
