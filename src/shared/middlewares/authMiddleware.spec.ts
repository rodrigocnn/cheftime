import jwt from "jsonwebtoken";
import { authMiddleware } from "./authMiddleware";

jest.mock("jsonwebtoken");

describe("authMiddleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() if token is valid", () => {
    req.headers.authorization = "Bearer valid_token";

    (jwt.verify as jest.Mock).mockReturnValue({
      id: "123",
      email: "test@example.com",
    });

    authMiddleware(req, res, next);
    expect(req.user).toEqual({ id: "123", email: "test@example.com" });
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no Authorization header is provided", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token não fornecido" });
  });

  it("should return 401 if token is missing after Bearer", () => {
    req.headers.authorization = "Bearer ";

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid or expired", () => {
    req.headers.authorization = "Bearer invalid_token";

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Token inválido ou expirado");
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token inválido ou expirado",
    });
  });
});
