import { ICreateReservationDTO } from "../dtos/create-reservation.dto";
import { IResponseReservation } from "../dtos/response-reservation.dto";
import { IReservationRepository } from "../repositories/reservations.repository";

export class ReservationsService {
  constructor(private reservationRepository: IReservationRepository) {}

  async create(data: ICreateReservationDTO): Promise<IResponseReservation> {
    // Aqui você pode adicionar validações de negócio, por exemplo: email único
    return this.reservationRepository.create(data);
  }

  async read(): Promise<IResponseReservation[]> {
    return this.reservationRepository.read();
  }

  async show(id: string): Promise<IResponseReservation | null> {
    return this.reservationRepository.show(id);
  }

  async update(
    id: string,
    data: ICreateReservationDTO
  ): Promise<IResponseReservation | null> {
    return this.reservationRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.reservationRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    if (!this.reservationRepository.exists) {
      throw new Error("Method not implemented.");
    }
    return this.reservationRepository.exists(id)!;
  }

  async getAvailableSlots(): Promise<IResponseReservation[] | null> {
    return this.reservationRepository.getAvailableSlots();
  }
}
