import { IReservationRepository } from "../repositories/reservations.repository";
import { ReservationsService } from "./reservations.service";
import { ICreateReservationDTO } from "../dtos/create-reservation.dto";

function makeReservation(): ICreateReservationDTO {
  return {
    dateTime: new Date(),
    status: true,
    clientId: "c24e8c4b-0bf4-48da-87c9-6c08a9a9dc09",
  };
}

describe("ReservationService", () => {
  let mockReservationRepository: IReservationRepository;
  let reservationsService: ReservationsService;

  beforeEach(() => {
    mockReservationRepository = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      show: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    reservationsService = new ReservationsService(mockReservationRepository);
  });

  describe("create", () => {
    it("should create a reservation successfully", async () => {
      const reservationData = makeReservation();
      const expectedReservation = {
        id: "uuid-123",
        ...reservationData,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      (mockReservationRepository.create as jest.Mock).mockResolvedValue(
        expectedReservation
      );

      const result = await reservationsService.create(reservationData);

      expect(mockReservationRepository.create).toHaveBeenCalledWith(
        reservationData
      );
      expect(result).toEqual(expectedReservation);
    });
  });

  describe("read", () => {
    it("should return all reservations", async () => {
      const reservations = [
        { id: "uuid-1", ...makeReservation() },
        { id: "uuid-2", ...makeReservation() },
      ];

      (mockReservationRepository.read as jest.Mock).mockResolvedValue(
        reservations
      );

      const result = await reservationsService.read();

      expect(mockReservationRepository.read).toHaveBeenCalled();
      expect(result).toEqual(reservations);
    });
  });

  describe("show", () => {
    it("should return a reservation by id", async () => {
      const reservation = { id: "uuid-123", ...makeReservation() };

      (mockReservationRepository.show as jest.Mock).mockResolvedValue(
        reservation
      );

      const result = await reservationsService.show("uuid-123");

      expect(mockReservationRepository.show).toHaveBeenCalledWith("uuid-123");
      expect(result).toEqual(reservation);
    });
  });

  describe("update", () => {
    it("should update a reservation successfully", async () => {
      const updatedReservation = {
        ...makeReservation(),
      };

      (mockReservationRepository.update as jest.Mock).mockResolvedValue(
        updatedReservation
      );

      const result = await reservationsService.update(
        "uuid-123",
        updatedReservation
      );

      expect(mockReservationRepository.update).toHaveBeenCalledWith(
        "uuid-123",
        updatedReservation
      );
      expect(result).toEqual(updatedReservation);
    });
  });

  describe("delete", () => {
    it("should delete a reservation successfully", async () => {
      (mockReservationRepository.delete as jest.Mock).mockResolvedValue(true);

      const result = await reservationsService.delete("uuid-123");

      expect(mockReservationRepository.delete).toHaveBeenCalledWith("uuid-123");
      expect(result).toBe(true);
    });
  });

  describe("exists", () => {
    it("should return true if reservation exists", async () => {
      (mockReservationRepository.exists as jest.Mock).mockResolvedValue(true);

      const result = await reservationsService.exists("uuid-123");

      expect(mockReservationRepository.exists).toHaveBeenCalledWith("uuid-123");
      expect(result).toBe(true);
    });

    it("should return false if reservation does not exist", async () => {
      (mockReservationRepository.exists as jest.Mock).mockResolvedValue(false);

      const result = await reservationsService.exists("uuid-999");

      expect(mockReservationRepository.exists).toHaveBeenCalledWith("uuid-999");
      expect(result).toBe(false);
    });
  });
});
