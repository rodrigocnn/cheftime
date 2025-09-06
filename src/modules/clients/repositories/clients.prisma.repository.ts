import type { PrismaClient } from "../../../../prisma/generated/prisma";
import { IClientRepository } from "./clients.repository";
import { IResponseClient } from "../dtos/response-client.dto";
import { ICreateClientDTO } from "../dtos/create-client.dto";

export class ClientsPrismaRepository implements IClientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: ICreateClientDTO) {
    return this.prisma.client.create({ data });
  }

  async read(): Promise<IResponseClient[]> {
    const clients = await this.prisma.client.findMany();
    return clients;
  }

  async update(
    id: string,
    data: ICreateClientDTO
  ): Promise<IResponseClient | null> {
    return await this.prisma.client.update({
      where: { id }, // identifica o registro
      data, // campos a atualizar
    });
  }

  async show(id: string): Promise<IResponseClient | null> {
    return await this.prisma.client.findFirst({ where: { id: id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.prisma.client.findUnique({
      where: { id },
    });

    return result !== null;
  }
}
