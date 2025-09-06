import { ICreateClientDTO } from "../dtos/create-client.dto";
import { IResponseClient } from "../dtos/response-client.dto";
import { IClientRepository } from "../repositories/clients.repository";

export class ClientsService {
  constructor(private clientRepository: IClientRepository) {}

  async create(data: ICreateClientDTO): Promise<IResponseClient> {
    // Aqui você pode adicionar validações de negócio, por exemplo: email único
    return this.clientRepository.create(data);
  }

  async read(): Promise<IResponseClient[]> {
    return this.clientRepository.read();
  }

  async show(id: string): Promise<IResponseClient | null> {
    return this.clientRepository.show(id);
  }

  async update(
    id: string,
    data: ICreateClientDTO
  ): Promise<IResponseClient | null> {
    return this.clientRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.clientRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    if (!this.clientRepository.exists) {
      throw new Error("Method not implemented.");
    }
    return this.clientRepository.exists(id)!;
  }
}
