import { OrdersItems } from "../../entities/Orders-Items";

interface ICreateItemDTO {
  order_id: number;
  product_id: number;
  qty: number;
  price: number;
  sub_total: number;
}

interface IOrderItemRepository {
  create(data: ICreateItemDTO): Promise<OrdersItems>;
  createBulk(data: ICreateItemDTO[]): Promise<void>;
}

export { IOrderItemRepository, ICreateItemDTO };
