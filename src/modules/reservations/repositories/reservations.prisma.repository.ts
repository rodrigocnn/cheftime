import type { PrismaClient } from "../../../../prisma/generated/prisma";

import { IReservationRepository } from "./reservations.repository";
import { IResponseReservation } from "../dtos/response-reservation.dto";
import { ICreateReservationDTO } from "../dtos/create-reservation.dto";

export class ReservationsPrismaRepository implements IReservationRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: ICreateReservationDTO) {
    return this.prisma.reservation.create({ data });
  }

  async read(): Promise<IResponseReservation[]> {
    const clients = await this.prisma.reservation.findMany();
    return clients;
  }

  async update(
    id: string,
    data: ICreateReservationDTO
  ): Promise<IResponseReservation | null> {
    return await this.prisma.reservation.update({
      where: { id },
      data,
    });
  }

  async show(id: string): Promise<IResponseReservation | null> {
    return await this.prisma.reservation.findFirst({ where: { id: id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.reservation.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.prisma.reservation.findUnique({
      where: { id },
    });

    return result !== null;
  }

  async getAvailableSlots(): Promise<IResponseReservation[] | null> {
    const result = await this.prisma.reservation.findMany({
      where: { status: true },
    });

    return result;
  }
}
