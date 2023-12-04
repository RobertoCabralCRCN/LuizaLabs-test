import { OrdersItems } from "../../entities/Orders-Items";
import {
  ICreateItemDTO,
  IOrderItemRepository,
} from "../interfaces/OrderItemRepository.interface";

class FakeOrderItemRepository implements IOrderItemRepository {
  private ordersItems: OrdersItems[] = [];

  async create(data: ICreateItemDTO): Promise<OrdersItems> {
    const items = new OrdersItems();

    Object.assign(items, data);

    this.ordersItems.push(items);

    return Promise.resolve(items);
  }

  async createBulk(data: ICreateItemDTO[]): Promise<void> {
    return Promise.resolve();
  }

}
export { FakeOrderItemRepository };
