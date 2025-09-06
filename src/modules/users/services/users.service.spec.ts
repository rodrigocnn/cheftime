// clients.service.spec.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ICreateUserDTO } from "../dtos/create-user.dto";
import { UsersService } from "./users.service";
import { IUserRepository } from "../repositories/users.repository";

function makeUser(): ICreateUserDTO {
  return {
    name: "Rodrigo César",
    email: "rodrigo@gmail.com",
    password: "hashed_password",
    role: "admin",
  };
}

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("UsersService", () => {
  let mockUserRepository: IUserRepository;
  let usersService: UsersService;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake_jwt_token");
    usersService = new UsersService(mockUserRepository);
  });

  describe("create", () => {
    it("should create a client successfully", async () => {
      const userData = makeUser();
      const expectedUser = {
        id: "dd682b13-476e-4830-9f51-60aeb3cb4e7c",
        ...userData,
        password: "hashed_password",
        createdAt: "2025-08-31T18:16:54.236Z",
        updatedAt: "2025-08-31T18:16:54.236Z",
      };

      (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedUser);

      const result = await usersService.create(userData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(expectedUser);
    });
  });

  it("should authenticate a user", async () => {
    const userLogin = {
      ...makeUser(),
      id: "fake-uuid-1234",
    };

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(userLogin);

    const result = await usersService.login({
      email: userLogin.email,
      password: "zxc123",
    });

    const expectedUserAuth = {
      id: "fake-uuid-1234",
      name: "Rodrigo César",
      email: "rodrigo@gmail.com",
      token: "fake_jwt_token",
      expiresIn: "1d",
    };

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      userLogin.email
    );
    expect(bcrypt.compare).toHaveBeenCalledWith("zxc123", userLogin.password);
    expect(result).toEqual(expectedUserAuth);
  });

  it("should throw an error when the user provides an incorrect password", async () => {
    const userLogin = {
      ...makeUser(),
      id: "fake-uuid-1234",
    };
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(userLogin);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      usersService.login({
        email: userLogin.email,
        password: "zxc123",
      })
    ).rejects.toThrow("Email ou Password Incorrect");
  });

  it("should return null when the user is not found", async () => {
    const userLogin = {
      ...makeUser(),
      id: "fake-uuid-1234",
    };
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      usersService.login({
        email: userLogin.email,
        password: "zxc123",
      })
    ).rejects.toThrow("Email ou Password Incorrect");
  });
});
