export interface IResponseClient {
  id: string;
  name: string;
  email: string;
  birth: string;
  phone?: string;
  cpf?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
