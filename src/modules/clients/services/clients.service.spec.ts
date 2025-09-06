// clients.service.spec.ts
import { ClientsService } from "./clients.service";
import { IClientRepository } from "../repositories/clients.repository";
import { ICreateClientDTO } from "../dtos/create-client.dto";

function makeClient(): ICreateClientDTO {
  return {
    name: "Rodrigo César",
    email: "rodrigo@exemplo.com",
    birth: "1985-05-01",
    phone: "(11) 99999-0000",
    cpf: "11122233344",
    rg: "0928901564",
  };
}

describe("ClientsService", () => {
  let mockClientRepository: IClientRepository;
  let clientsService: ClientsService;

  beforeEach(() => {
    mockClientRepository = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      show: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    clientsService = new ClientsService(mockClientRepository);
  });

  describe("create", () => {
    it("should create a client successfully", async () => {
      const clientData = makeClient();
      const expectedClient = { id: "uuid-123", ...clientData };

      (mockClientRepository.create as jest.Mock).mockResolvedValue(
        expectedClient
      );

      const result = await clientsService.create(clientData);

      expect(mockClientRepository.create).toHaveBeenCalledWith(clientData);
      expect(result).toEqual(expectedClient);
    });
  });

  describe("read", () => {
    it("should return all clients successfully", async () => {
      const clientData = makeClient();
      const expectedClients = [
        { id: "uuid-123", ...clientData },
        { id: "uuid-456", ...clientData },
      ];

      (mockClientRepository.read as jest.Mock).mockResolvedValue(
        expectedClients
      );

      const result = await clientsService.read();

      expect(mockClientRepository.read).toHaveBeenCalled();
      expect(result).toEqual(expectedClients);
    });
  });

  describe("update", () => {
    it("should update client successfully", async () => {
      const clientData = makeClient();
      const expectedClients = [{ id: "uuid-123", ...clientData }];

      (mockClientRepository.update as jest.Mock).mockResolvedValue(
        expectedClients
      );

      const result = await clientsService.update("uuid-123", clientData);

      expect(mockClientRepository.update).toHaveBeenCalled();
      expect(result).toEqual(expectedClients);
    });
  });

  describe("delete", () => {
    it("should delete client successfully", async () => {
      (mockClientRepository.delete as jest.Mock).mockResolvedValue(undefined);

      await clientsService.delete("uuid-123");

      expect(mockClientRepository.delete).toHaveBeenCalledWith("uuid-123");
    });
  });

  describe("show", () => {
    it("should return a unique client successfully", async () => {
      const clientData = makeClient();
      const expectedClient = [{ id: "uuid-123", ...clientData }];

      (mockClientRepository.show as jest.Mock).mockResolvedValue(
        expectedClient
      );

      const result = await clientsService.show("uuid-123");

      expect(mockClientRepository.show).toHaveBeenCalledWith("uuid-123");
      expect(result).toEqual(expectedClient);
    });
  });
});
