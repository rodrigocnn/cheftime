import { Router } from "express";
import { clientsRoutes } from "../../modules/clients/routes/clients.routes";
import usersRoutes from "../../modules/users/routes/users.routes";
import { reservationsRoutes } from "../../modules/reservations/routes/reservations.routes";

export const router = Router();

router.use(clientsRoutes);
router.use(usersRoutes);
router.use(reservationsRoutes);
