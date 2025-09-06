import { ICreateClientDTO } from "../dtos/create-client.dto";
import { IResponseClient } from "../dtos/response-client.dto";

export interface IClientRepository {
  create(data: ICreateClientDTO): Promise<IResponseClient>;
  read(): Promise<IResponseClient[]>;
  update(id: string, data: ICreateClientDTO): Promise<IResponseClient | null>;
  show(id: string): Promise<IResponseClient | null>;
  delete(id: string): Promise<void>;
  exists?(id: string): Promise<boolean>;
}
