import { ICreateReservationDTO } from "../dtos/create-reservation.dto";
import { IResponseReservation } from "../dtos/response-reservation.dto";

export interface IReservationRepository {
  create(data: ICreateReservationDTO): Promise<IResponseReservation>;
  read(): Promise<IResponseReservation[]>;
  update(
    id: string,
    data: ICreateReservationDTO
  ): Promise<IResponseReservation | null>;
  show(id: string): Promise<IResponseReservation | null>;
  delete(id: string): Promise<void>;
  exists?(id: string): Promise<boolean>;
  getAvailableSlots(): Promise<IResponseReservation[] | null>;
}
