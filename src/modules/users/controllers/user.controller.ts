import { Request, Response } from "express";

import { UsersService } from "../services/users.service";

export class UserController {
  constructor(private userService: UsersService) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body; // você pode tipar depois como CreateClientDTO
      const client = await this.userService.create(data);
      return res.status(201).json(client);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar cliente" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const data = req.body; // depois pode tipar como ILoginUserDTO
      const loggedUser = await this.userService.login(data);
      return res.status(200).json(loggedUser);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }
  }
}
