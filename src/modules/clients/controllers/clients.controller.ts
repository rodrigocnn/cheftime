import { Request, Response } from "express";
import { ClientsService } from "../services/clients.service";

export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body; // você pode tipar depois como CreateClientDTO
      const client = await this.clientsService.create(data);
      return res.status(201).json(client);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar cliente" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const clients = await this.clientsService.read();
      return res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar clientes" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const client = await this.clientsService.update(id, data);
      return res.status(201).json(client);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar cliente" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.clientsService.delete(id);
      return res.status(200).json({ message: "Cliente excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar cliente" });
    }
  }
}
