import { Request, Response } from "express";

import { ReservationsService } from "../services/reservations.service";
import { createReservationSchema } from "../validations/create-reservation.schema";
import { validateReservation } from "../validations/validate-reservation";
import redisClient from "../../../database/redis";

export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  async create(req: Request, res: Response) {
    const isValid = validateReservation(createReservationSchema, req, res);
    if (!isValid) return res;

    try {
      const data = req.body;
      const client = await this.reservationsService.create(data);
      await redisClient.del("available_slots");

      return res.status(201).json(client);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao criar reserva",
      });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const clients = await this.reservationsService.read();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar reservas" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const client = await this.reservationsService.update(id, data);
      await redisClient.del("available_slots");
      return res.status(201).json(client);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar reserva" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.reservationsService.delete(id);
      return res.status(200).json({ message: "Reserva excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar reserva" });
    }
  }

  async getAvailable(req: Request, res: Response) {
    try {
      const cacheKey = `available_slots`;

      const cached = await redisClient.get(cacheKey);
      if (cached) {
        const data = typeof cached === "string" ? cached : cached.toString();
        return res.status(200).json(JSON.parse(data));
      }

      const available = await this.reservationsService.getAvailableSlots();
      await redisClient.setEx(cacheKey, 60, JSON.stringify(available));

      return res.status(200).json(available);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Erro ao buscar horários disponíveis",
      });
    }
  }
}
