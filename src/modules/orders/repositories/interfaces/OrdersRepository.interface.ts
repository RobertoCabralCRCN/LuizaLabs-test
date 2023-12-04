import { Order } from "../../entities/Order";

interface ICreateOrderDTO {
  order_id: number;
  user_id: number;
  date: Date;
}

interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findById(order_id: number): Promise<Order>;
  findByUser(user_id: number): Promise<Order[]>;
  createBulk(data: ICreateOrderDTO[]): Promise<void>
  findAll(skip: number, limit: number): Promise<Order[]>
}

export { IOrderRepository, ICreateOrderDTO };
