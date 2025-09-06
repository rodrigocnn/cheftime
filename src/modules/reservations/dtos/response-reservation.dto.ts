// dtos/response-reservation.dto.ts

export interface IResponseReservation {
  id: string;
  dateTime: Date;
  status: boolean;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
