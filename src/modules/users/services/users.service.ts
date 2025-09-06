import { hash, compare } from "bcrypt"; // ou "bcrypt"

import jwt from "jsonwebtoken";

import { ICreateUserDTO } from "../dtos/create-user.dto";
import { ILoginUserDTO } from "../dtos/login-user.dto";
import { IResponseLoginUser } from "../dtos/response-login-user.dto";
import { IUserRepository } from "../repositories/users.repository";

export class UsersService {
  constructor(private usersRepository: IUserRepository) {}

  async create(data: ICreateUserDTO) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await hash(data.password, saltRounds); // 10 salt rounds

    const userToCreate = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.usersRepository.create(userToCreate);
    return user;
  }

  async login(user: ILoginUserDTO): Promise<IResponseLoginUser> {
    const userExist = await this.usersRepository.findByEmail(user.email);

    if (!userExist) {
      const error = new Error("Email ou Password Incorrect");
      (error as any).statusCode = 401;
      throw error;
    }

    const passwordMatch = await compare(user.password, userExist.password);
    if (!passwordMatch) {
      const error = new Error("Email ou Password Incorrect");
      (error as any).statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { sub: userExist.id, email: userExist.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      token,
      expiresIn: "1d",
    };
  }
}
