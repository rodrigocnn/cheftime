import { ICreateUserDTO } from "../dtos/create-user.dto";

import { IResponseUser } from "../dtos/response-user.dto";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IResponseUser>;
  findByEmail(email: string): Promise<ICreateUserDTO>;
}
