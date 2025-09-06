import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import type { PrismaClient } from "../../../../prisma/generated/prisma";
import { ICreateUserDTO } from "../dtos/create-user.dto";
import { IUserRepository } from "./users.repository";
import { ILoginUserDTO } from "../dtos/login-user.dto";
import { IResponseLoginUser } from "../dtos/response-login-user.dto";
import { IResponseUser } from "../dtos/response-user.dto";

export class UsersPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: ICreateUserDTO): Promise<IResponseUser> {
    const user = await this.prisma.user.create({ data });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    return result !== null;
  }
}
